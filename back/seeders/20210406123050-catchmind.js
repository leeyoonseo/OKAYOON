'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        await queryInterface.bulkInsert('catchmind', [
            {
                id: '1',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz00.png',
                correct: '가로수',
                incorrect: '["공","장","소","궁","한","이","야","기","잼","난","사","건"]',
            },
            {
                id: '2',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz01.png',
                correct: '견인차',
                incorrect: '["강","초","숭","구","리","당","하","늘","개","퍼","풍","사"]',
            },
            {
                id: '3',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz02.png',
                correct: '도시',
                incorrect: '["강","초","숭","구","리","당","기","잼","난","사","수","김"]',
            },
            {
                id: '4',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz03.png',
                correct: '돈다발',
                incorrect: '["꼬","락","냄","새","돌","기","수","기","신","난","사","건"]',
            },
            {
                id: '5',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz04.png',
                correct: '사시나무',
                incorrect: '["묵","눈","깔","궁","한","이","탕","기","이","테","사","건"]',
            },
            {
                id: '6',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz05.png',
                correct: '산모',
                incorrect: '["기","장","소","슭","한","동","곰","기","잼","발","사","해"]',
            },
            {
                id: '7',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz06.png',
                correct: '샴푸',
                incorrect: '["쌍","둥","이","곰","한","탱","야","기","만","난","화","건"]',
            },
            {
                id: '8',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz07.png',
                correct: '오동나무',
                incorrect: '["옥","장","소","상","한","이","빌","기","딩","난","아","파"]',
            },
            {
                id: '9',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz08.png',
                correct: '이모',
                incorrect: '["진","장","소","로","한","뭉","술","기","잼","상","사","건"]',
            },
            {
                id: '10',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz09.png',
                correct: '인쇄소',
                incorrect: '["공","장","색","궁","한","초","야","기","록","난","별","건"]',
            },
            {
                id: '11',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz10.png',
                correct: '장갑차',
                incorrect: '["공","붕","소","궁","염","료","야","기","군","난","사","건"]',
            },
            {
                id: '12',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz11.png',
                correct: '쥐불놀이',
                incorrect: '["공","장","소","궁","한","소","방","관","잼","난","사","순"]',
            },
            {
                id: '13',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz12.png',
                correct: '카카오나무',
                incorrect: '["비","장","소","궁","까","이","똑","기","잼","난","사","쟁"]',
            },
            {
                id: '14',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz13.png',
                correct: '크라잉넛',
                incorrect: '["공","물","소","콧","한","이","야","울","보","난","사","벌"]',
            },
            {
                id: '15',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz14.png',
                correct: '파인애플',
                incorrect: '["공","툭","축","궁","구","이","과","기","일","난","꿀","건"]',
            },
            {
                id: '16',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz15.png',
                correct: '포크레인',
                incorrect: '["공","나","소","죽","한","네","야","창","비","난","영","화"]',
            },
            {
                id: '17',
                question: 'https://okayoon-bucket.s3.ap-northeast-2.amazonaws.com/game/catchmind/quiz/img_quiz16.png',
                correct: '해운대',
                incorrect: '["구","장","름","궁","놀","이","림","기","왕","난","따","건"]',
            },
        ], {});
    },

    down: async (queryInterface, Sequelize) => {
        await queryInterface.bulkDelete('catchmind', null, {

        });
    }
};
