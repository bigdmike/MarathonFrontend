function ActiveStopCard(card_num){
    let NowCard = document.querySelectorAll('.stop_card');
    let NowList = document.querySelectorAll('.record_list');
    for(let i=0;i<NowCard.length;i++){
        if(i == card_num){
            NowCard[i].classList.add('active');
            NowList[i].classList.add('active');
        }
        else{
        NowCard[i].classList.add('out');
        NowList[i].classList.remove('active');
        }
    }
}

function CloseStopCard(card_num){
    let NowCard = document.querySelectorAll('.stop_card');
    let NowList = document.querySelectorAll('.record_list');
    NowList[card_num].scrollTop = 0;
    for(let i=0;i<NowCard.length;i++){
        NowCard[i].classList.remove('out');
        NowCard[i].classList.remove('active');
        NowList[i].classList.remove('active');
    }
}