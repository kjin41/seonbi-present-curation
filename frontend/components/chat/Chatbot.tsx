import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@mui/material/Avatar';
import { InputBase } from '@mui/material';
import { FiSend } from 'react-icons/fi';
import { AiOutlineGift, AiOutlineRedo } from 'react-icons/ai';
import axios from 'axios';
import Messages from './Messages';
import {
  ChatbotWidget,
  ChatbotHeader,
  ChatbotBody,
  ChatbotFooter,
  SendBtn,
} from 'styles/chat/ChatbotElements';
import { useEffectOnce } from 'store/hook/useEffectOnce';
import { chatbotActions } from 'store/slice/chatbot';
import Btn from 'components/commons/Btn';
import Router from 'next/router';

function Chatbot() {
  // const textQuery = async () => {
  //   const response = await axios.post('http://localhost:3030/text_query', {
  //     text: '안녕',
  //     userId: 'seonbee406-2022',
  //   });
  //   console.log('response from dialogflow', response);
  // };
  const baseUrl = process.env.NEXT_PUBLIC_CHAT;

  const dispatch = useDispatch();
  const [currInput, setCurrInput] = useState<string>('');
  const [isCompleted, setCompleted] = useState<boolean>(false);

  // const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLInputElement>(null);

  useEffectOnce(() => {
    dispatch(chatbotActions.resetMessage());
    eventQuery('WelcomeToSeonbee');
  });

  const textQuery = async (text: string) => {
    // 1. 유저가 입력한 메시지 처리
    let conversation = {
      who: 'user',
      content: {
        text: {
          text: text,
        },
      },
      quick_replies: [],
      question: '',
      answer: '',
    };

    dispatch(chatbotActions.saveMessage(conversation));
    // console.log('text I sent', conversation);

    // 2. 챗봇이 보낸 메시지 처리
    const textQueryVariables = {
      text,
    };

    try {
      // textQuery Route에 리퀘스트를 보낸다.
      const response = await axios.post(
        baseUrl + "dialogflow/textQuery",
        textQueryVariables
      );
      // const content = response.data.fulfillmentMessages[0];
      // const content = {
      //   text: {
      //     text: response.data.fullfillmentMessages[0].text.text[0],
      //   },
      // };

      // for (let content of response.data.fulfillmentMessages) {
      //   conversation = {
      //     who: 'bot',
      //     content: content,
      //   };
      //   dispatch(chatbotActions.saveMessage(conversation));
      // }
      const content = response.data.fulfillmentMessages;
      // if (content.length == 1) {
      //   conversation = {
      //     who: 'bot',
      //     content: content[0],
      //     quick_replies: [],
      //   };
      // } else {
      //   conversation = {
      //     who: 'botWithQR',
      //     content: content[0],
      //     quick_replies:
      //       content[1].payload.fields.quick_replies.listValue.values,
      //   };
      // }
      conversation = {
        who: 'bot',
        content: content[0],
        quick_replies: content[1].payload.fields.quick_replies.listValue.values,
        question: content[1].payload.fields.qna.listValue.values[0].stringValue,
        answer: content[1].payload.fields.qna.listValue.values[1].stringValue,
      };
      dispatch(chatbotActions.saveMessage(conversation));

      if (conversation.question === 'price') {
        console.log('done');
        setCompleted(true);
      }
    } catch (error) {
      conversation = {
        who: 'bot',
        content: {
          text: {
            text: '에러가 발생했습니다. 관리자에게 문의해주세요.',
          },
        },
        quick_replies: [],
        question: '',
        answer: '',
      };

      dispatch(chatbotActions.saveMessage(conversation));
    }
  };

  const eventQuery = async (event: any) => {
    // 챗봇이 보낸 메시지 처리
    const eventQueryVariables = {
      event,
    };

    try {
      // eventQuery Route에 리퀘스트를 보낸다.
      const response = await axios.post(
        baseUrl + "dialogflow/eventQuery",
        eventQueryVariables
      );

      // const content = response.data.fulfillmentMessages[0];
      for (let content of response.data.fulfillmentMessages) {
        let conversation = {
          who: 'bot',
          content: content,
        };

        dispatch(chatbotActions.saveMessage(conversation));
      }
    } catch (error) {
      let conversation = {
        who: 'bot',
        content: {
          text: {
            text: '에러가 발생했습니다. 관리자에게 문의해주세요.',
          },
        },
      };

      dispatch(chatbotActions.saveMessage(conversation));
    }
  };

  const keyUpHandler = (e: any) => {
    if (e.key === 'Enter') {
      if (e.target.value) {
        // we will send text query route
        textQuery(e.target.value);

        e.target.value = '';
        setCurrInput('');

        console.log(scrollRef == null);

        console.log(scrollRef.current == null);

        // scrollRef.current?.scrollIntoView();
      }
    }
  };

  const sendInput = () => {
    if (currInput) {
      textQuery(currInput);

      setCurrInput("");

      // if (inputRef.current) {
      //   inputRef.current.value = '';
      //   inputRef.current.focus();
      // }
    }
  };

  return (
    <ChatbotWidget>
      {/* <ChatbotHeader>
        <h1>Seonbee Bot</h1>
      </ChatbotHeader> */}
      <ChatbotBody ref={scrollRef}>
        {/* component messages */}
        <Messages />
      </ChatbotBody>
      <ChatbotFooter>
        {isCompleted ? (
          <>
            <Btn
              className="me-5"
              onClick={() =>
                Router.push(
                  { pathname: '/recommend', query: { hi: '안녕' } },
                  { pathname: '/recommend' }
                )
              }
            >
              <AiOutlineGift />
              &nbsp; 추천 결과 보러가기
            </Btn>
            <Btn>
              <AiOutlineRedo />
              &nbsp; 다시 입력하기
            </Btn>
          </>
        ) : (
          <>
            <Avatar
              alt="avatar"
              src="https://joeschmoe.io/api/v1/random"
              sx={{ width: 24, height: 24 }}
            />
            <InputBase
              style={{ borderBottom: '1px solid black' }}
              sx={{ ml: 1, flex: 0.8 }}
              placeholder="대답해 주시오"
              value={currInput}
              onKeyUp={keyUpHandler}
              onChange={(e) => setCurrInput(e.target.value)}
              // ref={inputRef}
            />
            <SendBtn onClick={sendInput}>
              <FiSend />
            </SendBtn>
          </>
        )}
      </ChatbotFooter>
    </ChatbotWidget>
  );
}

export default Chatbot;
