'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('nonsensequiz', [
            {
                question: '타이타닉의 구명 보트에는 몇 명이 탈수 있을까?',
                example: `[{
                        "isCorrect":true,
                        "answer":"9명"
                    },{
                        "isCorrect":false,
                        "answer":"5명"
                    },{
                        "isCorrect":false,
                        "answer":"0명"
                    },{
                        "isCorrect":false,
                        "answer":"15명"
                    }]`
            },
            {
                question: '서울시민 모두가 동시에 외치면 무슨 말이 될까?',
                example: `[{
                        "isCorrect":true,
                        "answer":"천만의 말씀"
                    },{
                        "isCorrect":false,
                        "answer":"백만의 말씀"
                    },{
                        "isCorrect":false,
                        "answer":"주의 말씀"
                    },{
                        "isCorrect":false,
                        "answer":"말같은 소리"
                    }]`
            },
            {
                question: '금은 금인데 도둑고양이에게 가장 어울리는 금은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"야금야금"
                    },{
                        "isCorrect":false,
                        "answer":"도금"
                    },{
                        "isCorrect":false,
                        "answer":"순금"
                    },{
                        "isCorrect":false,
                        "answer":"금도끼은도끼"
                    }]`
            },
            {
                question: '고기 먹을 때마다 따라오는 개는?',
                example: `[{
                        "isCorrect":true,
                        "answer":"이쑤시개"
                    },{
                        "isCorrect":false,
                        "answer":"짱아"
                    },{
                        "isCorrect":false,
                        "answer":"동네 강아지"
                    },{
                        "isCorrect":false,
                        "answer":"배고프개"
                    }]`
            },
            {
                question: '진짜 새의 이름은 무엇일까요?',
                example: `[{
                        "isCorrect":true,
                        "answer":"참새"
                    },{
                        "isCorrect":false,
                        "answer":"트루"
                    },{
                        "isCorrect":false,
                        "answer":"bird"
                    },{
                        "isCorrect":false,
                        "answer":"독수리"
                    }]`
            },
            {
                question: '사람의 몸무게가 가장 많이 나갈 때는?',
                example: `[{
                        "isCorrect":true,
                        "answer":"철들 때"
                    },{
                        "isCorrect":false,
                        "answer":"밥먹은 후"
                    },{
                        "isCorrect":false,
                        "answer":"한창일 때"
                    },{
                        "isCorrect":false,
                        "answer":"다이어트 전"
                    }]`
            },
            {
                question: '세상에서 제일 더러운 집은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"똥집"
                    },{
                        "isCorrect":false,
                        "answer":"누나 집"
                    },{
                        "isCorrect":false,
                        "answer":"쓰레기 집"
                    },{
                        "isCorrect":false,
                        "answer":"내 방"
                    }]`
            },
            {
                question: '서로 진짜라고 우기는 신은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"옥신각신"
                    },{
                        "isCorrect":false,
                        "answer":"제우스"
                    },{
                        "isCorrect":false,
                        "answer":"우렁각시"
                    },{
                        "isCorrect":false,
                        "answer":"아테나"
                    }]`
            },
            {
                question: '재밌는 곳은 어딜까?',
                example: `[{
                        "isCorrect":true,
                        "answer":"냉장고"
                    },{
                        "isCorrect":false,
                        "answer":"우리 집"
                    },{
                        "isCorrect":false,
                        "answer":"놀이동산"
                    },{
                        "isCorrect":false,
                        "answer":"노래방"
                    }]`
            },
            {
                question: '겨울에 많이 쓰는 끈은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"따끈따끈"
                    },{
                        "isCorrect":false,
                        "answer":"후끈후끈"
                    },{
                        "isCorrect":false,
                        "answer":"노끈"
                    },{
                        "isCorrect":false,
                        "answer":"끈끈이 액체괴물"
                    }]`
            },
            {
                question: '토끼들이 젤 잘 하는 것은 무엇일까?',
                example: `[{
                        "isCorrect":true,
                        "answer":"도망치기"
                    },{
                        "isCorrect":false,
                        "answer":"덫 걸리기"
                    },{
                        "isCorrect":false,
                        "answer":"밥 먹기"
                    },{
                        "isCorrect":false,
                        "answer":"울기"
                    }]`
            },
            {
                question: '진짜 문제투성이인 것은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"시험지"
                    },{
                        "isCorrect":false,
                        "answer":"나"
                    },{
                        "isCorrect":false,
                        "answer":"내 친구"
                    },{
                        "isCorrect":false,
                        "answer":"유튜브"
                    }]`
            },
            {
                question: '먹고 살기 위해 하는 내기는?',
                example: `[{
                        "isCorrect":true,
                        "answer":"모내기"
                    },{
                        "isCorrect":false,
                        "answer":"당구 내기"
                    },{
                        "isCorrect":false,
                        "answer":"가위 바위 보"
                    },{
                        "isCorrect":false,
                        "answer":"돈 내기"
                    }]`
            },
            {
                question: '눈이 녹으면 뭐가 될까?',
                example: `[{
                        "isCorrect":true,
                        "answer":"눈물"
                    },{
                        "isCorrect":false,
                        "answer":"흙탕물"
                    },{
                        "isCorrect":false,
                        "answer":"빗물"
                    },{
                        "isCorrect":false,
                        "answer":"고인물"
                    }]`
            },
            {
                question: '가슴의 무게는?',
                example: `[{
                        "isCorrect":true,
                        "answer":"4근"
                    },{
                        "isCorrect":false,
                        "answer":"8근"
                    },{
                        "isCorrect":false,
                        "answer":"근손실왔다"
                    },{
                        "isCorrect":false,
                        "answer":"1근"
                    }]`
            },
            {
                question: '개 중에 가장 아름다운 개는?',
                example: `[{
                        "isCorrect":true,
                        "answer":"무지개"
                    },{
                        "isCorrect":false,
                        "answer":"비숑"
                    },{
                        "isCorrect":false,
                        "answer":"개이뻐"
                    },{
                        "isCorrect":false,
                        "answer":"시츄"
                    }]`
            },
            {
                question: '다 자랐는데도 계속 자라라고 하는 것은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"자라"
                    },{
                        "isCorrect":false,
                        "answer":"리트리버"
                    },{
                        "isCorrect":false,
                        "answer":"내 키"
                    },{
                        "isCorrect":false,
                        "answer":"서장훈님"
                    }]`
            },
            {
                question: '발이 두 개 달린 소는?',
                example: `[{
                        "isCorrect":true,
                        "answer":"이발소"
                    },{
                        "isCorrect":false,
                        "answer":"이솝이야기"
                    },{
                        "isCorrect":false,
                        "answer":"괴물"
                    },{
                        "isCorrect":false,
                        "answer":"투소"
                    }]`
            },
            {
                question: '사람이 즐겨 먹는 피는?',
                example: `[{
                        "isCorrect":true,
                        "answer":"커피"
                    },{
                        "isCorrect":false,
                        "answer":"계피"
                    },{
                        "isCorrect":false,
                        "answer":"사람 피"
                    },{
                        "isCorrect":false,
                        "answer":"닭 피"
                    }]`
            },
            {
                question: '약은 약인데 아껴 먹어야 하는 약은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"절약"
                    },{
                        "isCorrect":false,
                        "answer":"우루사"
                    },{
                        "isCorrect":false,
                        "answer":"비싼 약"
                    },{
                        "isCorrect":false,
                        "answer":"루테인"
                    }]`
            },
            {
                question: '장사꾼들이 싫어하는 경기는?',
                example: `[{
                        "isCorrect":true,
                        "answer":"불경기"
                    },{
                        "isCorrect":false,
                        "answer":"축구 경기"
                    },{
                        "isCorrect":false,
                        "answer":"야구 경기"
                    },{
                        "isCorrect":false,
                        "answer":"경기도"
                    }]`
            },
            {
                question: '창으로 찌르려고 할 때 하는 말은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"창피해"
                    },{
                        "isCorrect":false,
                        "answer":"이라얏"
                    },{
                        "isCorrect":false,
                        "answer":"무야호"
                    },{
                        "isCorrect":false,
                        "answer":"창간닷"
                    }]`
            },
            {
                question: '파리 중에 가장 무거운 파리는?',
                example: `[{
                        "isCorrect":true,
                        "answer":"돌팔이"
                    },{
                        "isCorrect":false,
                        "answer":"똥파리"
                    },{
                        "isCorrect":false,
                        "answer":"밥 먹은 파리"
                    },{
                        "isCorrect":false,
                        "answer":"초파리"
                    }]`
            },
            {
                question: '남이 먹어야 맛있는 것은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"골탕"
                    },{
                        "isCorrect":false,
                        "answer":"떡"
                    },{
                        "isCorrect":false,
                        "answer":"집밥"
                    },{
                        "isCorrect":false,
                        "answer":"군것질"
                    }]`
            },
            {
                question: '못 팔고도 돈 번 사람은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"철물점 주인"
                    },{
                        "isCorrect":false,
                        "answer":"판매상"
                    },{
                        "isCorrect":false,
                        "answer":"장사치"
                    },{
                        "isCorrect":false,
                        "answer":"계약자"
                    }]`
            },
            {
                question: '못사는 사람들이 하는 직업은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"목수"
                    },{
                        "isCorrect":false,
                        "answer":"철물점"
                    },{
                        "isCorrect":false,
                        "answer":"개그맨"
                    },{
                        "isCorrect":false,
                        "answer":"경찰"
                    }]`
            },
            {
                question: '이상한 사람들이 모이는 곳은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"치과"
                    },{
                        "isCorrect":false,
                        "answer":"병원"
                    },{
                        "isCorrect":false,
                        "answer":"광장"
                    },{
                        "isCorrect":false,
                        "answer":"시청"
                    }]`
            },
            {
                question: '눈사람의 반대말은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"일어선 사람"
                    },{
                        "isCorrect":false,
                        "answer":"곡사람"
                    },{
                        "isCorrect":false,
                        "answer":"람사눈"
                    },{
                        "isCorrect":false,
                        "answer":"없다"
                    }]`
            },
            {
                question: '가위바위( ), 가갸거겨( ), 123456789( ), 가나( )답은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"보고싶다"
                    },{
                        "isCorrect":false,
                        "answer":"보겨십다"
                    },{
                        "isCorrect":false,
                        "answer":"보고구라"
                    },{
                        "isCorrect":false,
                        "answer":"소고싶다"
                    }]`
            },
            {
                question: '먹을수록 덜덜 떨리는 음식은?',
                example: `[{
                        "isCorrect":true,
                        "answer":"추어탕"
                    },{
                        "isCorrect":false,
                        "answer":"캐비어"
                    },{
                        "isCorrect":false,
                        "answer":"국밥"
                    },{
                        "isCorrect":false,
                        "answer":"bbq 황금올리브"
                    }]`
            },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('nonsensequiz', null, {});
    }
};
