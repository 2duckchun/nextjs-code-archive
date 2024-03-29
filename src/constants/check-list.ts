import { CheckProcessData } from '@/types/app/check'

export const slugIntro = {
  test1: {
    title: '연습용 체크 프로세스1',
    introduce: '당신은 남자의 소울푸드를 좋아하십니까?',
  },
  test2: {
    title: '연습용 체크 프로세스2',
    introduce: '소주십니까? 맥주십니까? 소맥이십니까?',
  },
}

const test1: CheckProcessData = {
  title: '연습용 체크 프로세스1',
  introduce: ['제육볶음과 돈가스가 좋으십니까?', '그렇다면 국밥은 어떠십니까?'],
  questions: [
    {
      type: 'single',
      title: '제육볶음을 좋아하시나요?',
      options: [
        {
          label: '싫어요.',
          value: 0,
        },
        {
          label: '좋아요.',
          value: 1,
        },
      ],
    },
    {
      type: 'single',
      title: '돈가스를 좋아하시나요?',
      options: [
        {
          label: '싫어요.',
          value: 0,
        },
        {
          label: '좋아요.',
          value: 1,
        },
      ],
    },
    {
      type: 'single',
      title: '국밥을 좋아하시나요?',
      options: [
        {
          label: '싫어요.',
          value: 0,
        },
        {
          label: '좋아요.',
          value: 1,
        },
      ],
    },
    {
      type: 'select',
      title: '몇년생이신가요?',
      options: [
        {
          label: '1993년',
          value: 1993,
        },
        {
          label: '1994년',
          value: 1994,
        },
        {
          label: '1995년',
          value: 1995,
        },
        {
          label: '1996년',
          value: 1996,
        },
        {
          label: '1997년',
          value: 1997,
        },
        {
          label: '1998년',
          value: 1998,
        },
        {
          label: '1999년',
          value: 1999,
        },
        {
          label: '2000년',
          value: 2000,
        },
        {
          label: '2001년',
          value: 2001,
        },
        {
          label: '2002년',
          value: 2002,
        },
        {
          label: '2003년',
          value: 2003,
        },
        {
          label: '2004년',
          value: 2004,
        },
        {
          label: '2005년',
          value: 2005,
        },
      ],
    },
  ],
}

export const test2: CheckProcessData = {
  title: '연습용 체크 프로세스2',
  introduce: ['소주십니까? 맥주십니까? 소맥이십니까?', '하이볼은 어떠십니까?'],
  questions: [
    {
      type: 'single',
      title: '소주를 좋아하시나요?',
      options: [
        {
          label: '싫어요.',
          value: 0,
        },
        {
          label: '좋아요.',
          value: 1,
        },
      ],
    },
    {
      type: 'single',
      title: '맥주를 좋아하시나요?',
      options: [
        {
          label: '싫어요.',
          value: 0,
        },
        {
          label: '좋아요.',
          value: 1,
        },
      ],
    },
    {
      type: 'single',
      title: '하이볼을 좋아하시나요?',
      options: [
        {
          label: '싫어요.',
          value: 0,
        },
        {
          label: '좋아요.',
          value: 1,
        },
      ],
    },
    {
      type: 'select',
      title: '몇년생이신가요?',
      options: [
        {
          label: '1993년',
          value: 1993,
        },
        {
          label: '1994년',
          value: 1994,
        },
        {
          label: '1995년',
          value: 1995,
        },
        {
          label: '1996년',
          value: 1996,
        },
        {
          label: '1997년',
          value: 1997,
        },
        {
          label: '1998년',
          value: 1998,
        },
        {
          label: '1999년',
          value: 1999,
        },
        {
          label: '2000년',
          value: 2000,
        },
        {
          label: '2001년',
          value: 2001,
        },
        {
          label: '2002년',
          value: 2002,
        },
        {
          label: '2003년',
          value: 2003,
        },
        {
          label: '2004년',
          value: 2004,
        },
        {
          label: '2005년',
          value: 2005,
        },
      ],
    },
  ],
}

export const checkProcessData = {
  test1: test1,
  test2: test2,
}
