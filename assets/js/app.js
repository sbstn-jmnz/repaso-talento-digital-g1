const peopleForm = (function () { 

  const state = {}
  state.people = []

  const inputBtn  =  document.querySelector('button[type="submit"]')
  const nameInput = document.querySelector('input[type="text"]')
  const peopleList = document.querySelector('div.results')

  inputBtn.addEventListener('click', addPerson)
  peopleList.addEventListener('click', removePerson)
  
  function removePerson(e){
    if(!e.target.classList.contains('label-warning')){ return }

    const btn = e.target.parentNode
    removeFromStateAndHtml(btn)
  }

  function apiRemovePerson(str){
    const btn  = getButtonByString(str)
    removeFromStateAndHtml(btn)
  }

  function removeFromStateAndHtml(btn){
    if(!btn){ return }

    const personName = btn.innerText.split(" x")[0]
    const nameIndex  = state.people.indexOf(personName)

    state.people.splice(nameIndex,1)
    peopleList.removeChild(btn);
  }

  function getButtonByString(str){
    if(state.people.indexOf(str) > -1){
      for (const button of document.querySelectorAll("button.btn-success")) {
            console.log(button.textContent);
          if (button.textContent.split(" x")[0] == str) {
          return button
        }
      }
    }
  }

  function addPerson(e){
  // TODO: Agregar validaciones: Campo nombre no nulo, y mínimo 2 carácteres
    let personName = e
    if(typeof(e)=='object'){ 
      e.preventDefault() 
      personName = nameInput.value
      };
    state.people.push(personName)
    render()
  }

  function render(){
    const lastPerson = state.people[state.people.length - 1]
    const personBtn = document.createElement('button')
    const closeSpan = document.createElement('span')

    closeSpan.className = 'label label-warning'
    closeSpan.innerText = ' x'
    personBtn.className = 'btn btn-success mx-2 my-2'
    personBtn.innerText = lastPerson
    personBtn.appendChild(closeSpan)
    peopleList.appendChild(personBtn)
  }

  return { addPerson, removePerson: apiRemovePerson}
 })()



