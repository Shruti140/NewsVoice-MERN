import React from 'react';

const FakeNewsDetector = ({ title, content }) => {
    const fakeKeywords = [
        'shocking', 'unbelievable', 'miracle', 'breaking', 'exclusive',
        'you won’t believe', 'click here', 'urgent', 'scam', 'hoax',
        'conspiracy', 'hidden truth', 'cover-up', 'secret', 'banned',
        'censored', 'forbidden', 'insane', 'incredible', 'wow', 'omg',
        'must see', 'alert', 'breaking news'
    ];

    const sensationalPunctuation = ['!!!', '???', '!!!', '???'];
    const fakeKeywordWeight = 1;
    const punctuationWeight = 0.5;
    let score = 0;

    fakeKeywords.forEach((keyword) => {
        if ((title && title.toLowerCase().includes(keyword)) || (content && content.toLowerCase().includes(keyword))) {
            score += fakeKeywordWeight;
        }
    });

    sensationalPunctuation.forEach((punctuation) => {
        if ((title && title.includes(punctuation)) || (content && content.includes(punctuation))) {
            score += punctuationWeight;
        }
    });

    const isFake = score > 2;

    return (
        <div className={`news-fake ${isFake ? 'fake' : 'not-fake'}`}>
            <p className='news-text'>
            {isFake ? 'This article might be fake' : 'This article seems legitimate'}
            (Score: {score})
            </p>
        </div>
    );
};

export default FakeNewsDetector;
