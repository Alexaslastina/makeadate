function dq(_selector){
  return document.querySelector(_selector);
}

function dqEvent(_selector,_event,_callBackfunction){
  return document.querySelector(_selector).addEventListener(_event,_callBackfunction);
}