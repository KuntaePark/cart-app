// querySelector= HTML의 모든것을 선택할 수 잇음: 태그이름, 클래스명, 아이디명 모두 선택가능 선택할 때 css 규칙을 따라서 작성함
// 예) class="newClass" => '.newClass'
// id="newId" => '#id'
// ul div => 'ul div'
// ul div.newClass => 'ul div.newClass'
// const body = document.querySelector("body")
// body.style.backgroundColor = "coral"
// const h1 = document.querySelector("header h1")
// h1.style.color = "coral"

// getElementById = id값만 그래서 그냥 '' 안에 적어주면됨
// 예) id="item" => ('item')
// document.querySelector("input").id = "item"
// const item = document.getElementById("item")
// item.style.border = "1px solid"

// innerHTML = 해당 태그 안에 새로운 자식요소를 넣을 때 사용함
// 자식요소는 태그들 문자열에 담아서 사용해도 되지만. 변수를 같이 사용하려면 ``사용해서 하면 개꿀.

const db = localStorage;
let list = JSON.parse(db.getItem("list")) ?? [];
//localStorage는 모든것을 문자열로 저장
//null: object, 메모리를 먹음
//undefined : 아무것도 없음
const rendering = () => {
  const ul = document.querySelector("ul");

  ul.innerHTML = null;

  for (
    let i = 0;
    i < list.length;
    i = i + 1 // i += 1 // i++
  ) {
    const button = document.createElement("button");

    button.innerText = "삭제";
    button.onclick = () => {
      list.splice(i, 1);
      db.setItem("list", JSON.stringify(list));
      rendering();
    };

    const p = document.createElement("p");
    p.innerText = list[i];
    const div = document.createElement("div");
    div.onclick = () => {
      p.innerText = "";
      const modInput = document.createElement("input");
      modInput.style.flex = 1;
      modInput.style.border = "none";
      modInput.style.borderRadius = "0";
      modInput.style.borderBottom = "1px solid";

      modInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
          if (!modInput.value.length) {
            alert("물건 이름을 입력하세요!");
            modInput.value = list[i];
            return modInput.focus();
          }
          list[i] = modInput.value;
          db.setItem("list", JSON.stringify(list));
          return rendering();
        }
      });

      modInput.value = list[i];
      p.append(modInput);
      modInput.focus();
    };
    div.append(p, button);

    const li = document.createElement("li");
    li.append(div);

    ul.append(li);

    //   const tag = `
    //     <li>
    //         <div>
    //             <p>${list[i]}</p>
    //             ${button}
    //         </div>
    //     </li>
    //     `
    //   console.log(tag)
    //   number += i
    //   li += tag
  }
};

rendering();

const form = document.querySelector("form");
const input = document.getElementById("item");

form.addEventListener(
  "submit",

  (event) => {
    event.preventDefault(); // 새로고침 방지 // form 태그 한정

    const item = input.value;
    if (item.length === 0) {
      alert("장 볼 물건을 입력해주세요.");
      return input.focus();
    }

    // list.push()
    list.unshift(item);
    db.setItem("list", JSON.stringify(list));

    rendering();

    input.value = "";
  }
);
