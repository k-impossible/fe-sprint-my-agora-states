'use strict'

// index.html을 열어서 agoraStatesDiscussions 배열 요소를 확인하세요.
console.log(agoraStatesDiscussions);

const formBtn = document.getElementById('form_button')

console.log(formBtn)
formBtn.onclick = () => {
  const formTitle = document.getElementById('form_title').value
  const formName = document.getElementById('form_name').value
  const formStory = document.getElementById('form_story').value

  const myObj = {
    id: self.crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    title: formTitle,
    url: "https://github.com/codestates-seb/agora-states-fe/discussions/45",
    author: formName,
    answer: null,
    bodyHTML: formStory,
    avatarUrl:
      "https://avatars.githubusercontent.com/u/97888923?s=64&u=12b18768cdeebcf358b70051283a3ef57be6a20f&v=4",
  }

  agoraStatesDiscussions.push(myObj)
  console.log(agoraStatesDiscussions)
  render(ul)
}

// convertToDiscussion은 아고라 스테이츠 데이터를 DOM으로 바꿔줍니다.
const convertToDiscussion = (obj) => {
  const li = document.createElement("li"); // li 요소 생성
  li.className = "discussion__container"; // 클래스 이름 지정

  const avatarWrapper = document.createElement("div");
  avatarWrapper.className = "discussion__avatar--wrapper";
  const discussionContent = document.createElement("div");
  discussionContent.className = "discussion__content";
  const discussionAnswered = document.createElement("div");
  discussionAnswered.className = "discussion__answered";

  // TODO: 객체 하나에 담긴 정보를 DOM에 적절히 넣어주세요.

  //아바타 이미지 추가
  const avatarImg = document.createElement("img");
  avatarImg.setAttribute('src',obj.avatarUrl)
  avatarImg.setAttribute('alt',`avatar of ${obj.author}`)
  avatarImg.classList.add('discussion__avatar--image')
  avatarWrapper.append(avatarImg)

  //제목,링크 추가
  const discussionTitle = document.createElement("h2");
  const discussionTitleLink = document.createElement("a");

  discussionTitle.classList.add('discussion__title')
  discussionTitleLink.textContent = obj.title
  // discussionTitleLink.setAttribute('href',obj.url)
  discussionTitle.appendChild(discussionTitleLink)
  discussionContent.appendChild(discussionTitle)

  //작성정보 추가
  const discussionInfo = document.createElement("div");
  discussionInfo.classList.add('discussion__information');
  const discussionTime = document.createElement("div");
  const discussionTime2 = document.createElement("div");
  discussionTime.classList.add('discussion__time');
  discussionTime2.classList.add('discussion__time');

  const splitDate1 = obj.createdAt.split("-");
  const splitDate2 = splitDate1[2].split("T")
  const splitDate3 = splitDate2[1].split(":")

  const year = Number(splitDate1[0]);
  const month = Number(splitDate1[1]);
  const day = Number(splitDate2[0]);
  const hour = Number(splitDate3[0]);
  const minute = Number(splitDate3[1]);
  const second = Number(splitDate3[2].slice(0,2));

  const newDate = new Date(Date.UTC(year,month,day,hour,minute,second))
  const newTime = newDate.toLocaleTimeString("ko-KR").split(":")
  discussionInfo.textContent = obj.author
  discussionTime.textContent = newDate.toLocaleDateString("ko-KR")
  discussionTime2.textContent = newTime[0]+ ":" +newTime[1]

  discussionContent.appendChild(discussionInfo)
  discussionContent.appendChild(discussionTime)
  discussionContent.appendChild(discussionTime2)

  li.append(avatarWrapper, discussionContent, discussionAnswered);
  return li;
};

// agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링하는 함수입니다.
const render = (element) => {
  for (let i = 0; i < agoraStatesDiscussions.length; i += 1) {
    element.append(convertToDiscussion(agoraStatesDiscussions[i]));
  }
  return;
};

// ul 요소에 agoraStatesDiscussions 배열의 모든 데이터를 화면에 렌더링합니다.
const ul = document.querySelector("ul.discussions__container");
render(ul);
