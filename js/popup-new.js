// Открытие и закрытие попапа
const popupLinks = document.querySelectorAll('.popup-link');
const body = document.querySelector('body');
const lockPadding = document.querySelectorAll(".lock-padding");

let unlock = true;

const timeout = 200;

if (popupLinks.length > 0) {
	for (let index = 0; index < popupLinks.length; index++) {
		const popupLink = popupLinks[index];
		popupLink.addEventListener("click", function (e) {
			const popupName = popupLink. getAttribute('href').replace('#', '');
			const curentPopup = document.getElementById(popupName);
			popupOpen(curentPopup);
			e.preventDefault();
		});
	}
}

const popupCloseIcon = document.querySelectorAll('.close-popup');
if (popupCloseIcon.length > 0) {
	for (let index = 0; index < popupCloseIcon.length; index++) {
		const el = popupCloseIcon[index];
		el.addEventListener('click', function (e) {
			popupClose(el.closest('.popup-new'));
			e.preventDefault();
		});
	}
}

function popupOpen(curentPopup) {
	if (curentPopup && unlock) {
		const popupActive = document.querySelector('.popup-new.open');
		if (popupActive) {
			popupClose(popupActive, false);
		} else {
			bodyLock();
		}
		curentPopup.classList.add('open');
		curentPopup.addEventListener("click", function (e) {
			if (!e.target.closest('.popup__content-new')) {
				popupClose(e.target.closest('.popup-new'));
			}
		});
	}
}

function popupClose(popupActive, doUnlock = true) {
 	if (unlock) {
 		popupActive.classList.remove('open');
 		if (doUnlock) {
 			bodyUnlock();
 		}
 	}
}

function bodyLock() {
	const lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

	if (lockPadding.length > 0) {
		for (let index = 0; index < lockPadding.length; index++) {
			const el = lockPadding[index];
			el.style.paddingRight = lockPaddingValue;
		}
	}
	body.style.paddingRight = lockPaddingValue;
	body.classList.add('lock');

	unlock = false;
	setTimeout(function () {
		unlock = true;
	},	timeout);
} 

function bodyUnlock() {
	setTimeout(function () {
		if (lockPadding.length > 0) {
			for (let index = 0; index < lockPadding.length; index++) {
				const el = lockPadding[index];
				el.style.paddingRight = '0px';
			}
		}
		body.style.paddingRight = '0px';
		body.classList.remove('lock');
	},	timeout);

	unlock = false;
	setTimeout(function () {
		unlock = true;
	},	timeout);
}

document.addEventListener('keydown', function (e) {
	if (e.which === 27) {
		const popupActive = document.querySelector('.popup-new.open');
		popupClose(popupActive);
	}
});
// Маска для input[type="tel"]
document.addEventListener("DOMContentLoaded", function () {
   var phoneInputs = document.querySelectorAll('input[data-tel-input]');

   var getInputNumbersValue = function (input) {
       // Return stripped input value — just numbers
       return input.value.replace(/\D/g, '');
   }

   var onPhonePaste = function (e) {
       var input = e.target,
           inputNumbersValue = getInputNumbersValue(input);
       var pasted = e.clipboardData || window.clipboardData;
       if (pasted) {
           var pastedText = pasted.getData('Text');
           if (/\D/g.test(pastedText)) {
               // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
               // formatting will be in onPhoneInput handler
               input.value = inputNumbersValue;
               return;
           }
       }
   }

   var onPhoneInput = function (e) {
       var input = e.target,
           inputNumbersValue = getInputNumbersValue(input),
           selectionStart = input.selectionStart,
           formattedInputValue = "";

       if (!inputNumbersValue) {
           return input.value = "";
       }

       if (input.value.length != selectionStart) {
           // Editing in the middle of input, not last symbol
           if (e.data && /\D/g.test(e.data)) {
               // Attempt to input non-numeric symbol
               input.value = inputNumbersValue;
           }
           return;
       }

       if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
           if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
           var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
           formattedInputValue = input.value = firstSymbols + " ";
           if (inputNumbersValue.length > 1) {
               formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
           }
           if (inputNumbersValue.length >= 5) {
               formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
           }
           if (inputNumbersValue.length >= 8) {
               formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
           }
           if (inputNumbersValue.length >= 10) {
               formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
           }
       } else {
           formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
       }
       input.value = formattedInputValue;
   }
   var onPhoneKeyDown = function (e) {
       // Clear input after remove last symbol
       var inputValue = e.target.value.replace(/\D/g, '');
       if (e.keyCode == 8 && inputValue.length == 1) {
           e.target.value = "";
       }
   }
   for (var phoneInput of phoneInputs) {
       phoneInput.addEventListener('keydown', onPhoneKeyDown);
       phoneInput.addEventListener('input', onPhoneInput, false);
       phoneInput.addEventListener('paste', onPhonePaste, false);
   }
})