const peopleForm = (function () { 

  const state = {}
  state.people = ['Seba']

  const inputBtn  =  document.querySelector('button[type="submit"]')
  const nameInput = document.querySelector('input[type="text"]')
  const peopleList = document.querySelector('div.results')

  inputBtn.addEventListener('click', addPerson)
  peopleList.addEventListener('click', removePerson)

  render()
  
  function removePerson(e){
    let btn, personName, nameIndex
    
    if(!e.target.classList.contains('label-warning')){ return }

    btn = e.target.parentNode
    personName = btn.innerText.split(" x")[0]
    nameIndex = state.people.indexOf(personName)
    state.people.splice(nameIndex,1)
    peopleList.removeChild(btn);
  }

  function apiRemovePerson(str){
    let btn = getButtonByString(str)
    const personName = btn.innerText.split(" x")[0]
    const nameIndex = state.people.indexOf(personName)
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



