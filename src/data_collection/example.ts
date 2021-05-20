import Nightmare from 'nightmare';

const example = () => {   
    const nightmare = Nightmare();
    console.log(nightmare)
    nightmare.goto('http://cnn.com')
    .evaluate(() => {
        return document.title;
    })
    .end()
    .then((title) => {
        console.log(title);
    })
}

export default example;