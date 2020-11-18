const peopleForm = (function () { 

  const state = {}
  state.people = []
  state.errors = []

  const peopleList = document.querySelector('div.results')
  const nameInput = document.querySelector('input[type="text"]')
  const inputBtn  =  document.querySelector('button[type="submit"]')

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
    let personName = e
    
    if(typeof(e)=='object'){ 
      e.preventDefault() 
      personName = nameInput.value
    };

    if(validate(personName)){
      state.people.push(personName)
      render()
    }else{
      alert(state.errors.join(' '))
    }
     nameInput.value = ''
  }

  function validate(personName){
    state.errors = []
    const v1 = validatesOnlyChars(personName)
    const v2 = validatesUniqueness(personName)
    const v3 = validatesNotNull(personName)

    return (v1 && v2 && v3)
  }

  function validatesUniqueness(str){
    if(!state.people.some(person => person == str)){
      return true
    }else{
      state.errors.push('Ese nombre ya existe.')
      return false
    }
  }

  function validatesNotNull(str){
    if(str == '' || str == null){
      state.errors.push('El nombre no puede ser vacío.')
      return false
    }
    return true
  }

  function validatesOnlyChars(str){
    let regex = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/g;

    if(regex.test(str)){
      return true
    } else{
      state.errors.push('El nombre contiene caractéres inválidos.')
      return false
    }
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



