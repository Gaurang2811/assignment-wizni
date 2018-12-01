// Block keys other than numbers
export const onlyNum = (event) => {
  // if event is undefined do nothing
  if (event === undefined) { return; }
  // Allow: backspace, delete, tab, escape, enter and .
  if ([46, 8, 9, 27, 13, 110].includes(event.keyCode) ||
       // Allow: Ctrl+A, Command+A
      (event.keyCode === 65 && (event.ctrlKey === true || event.metaKey === true)) ||
       // Allow: home, end, left, right, down, up
      (event.keyCode >= 35 && event.keyCode <= 40)) {
           // let it happen, don't do anything
           return;
  }

  // Ensure that it is a number and stop the keypress
  if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
  }
};

// Block input after provided length
export const maxLength = (event, length) => {
  // if event is undefined do nothing
  if (event === undefined) { return; }
  // Allow: backspace, delete, tab, escape, enter and .
  if ([46, 8, 9, 27, 13, 110].includes(event.keyCode) ||
       // Allow: Ctrl+A, Command+A
      (event.keyCode === 65 && (event.ctrlKey === true || event.metaKey === true)) ||
       // Allow: home, end, left, right, down, up
      (event.keyCode >= 35 && event.keyCode <= 40)) {
           // let it happen, don't do anything
           return true;
  }

  if (event.target.value.length >= length) {
    event.preventDefault();
  }
    return false;
};

// Here we can store all of our regex that can be used for vlidations
export const regex = {
  onlyNum: /^\d+$/,
  onlyAlpha: /^[a-zA-Z]+$/,
  onlyTF: /true|false/gi,
};
