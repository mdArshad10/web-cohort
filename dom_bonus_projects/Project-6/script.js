

const calculatorBtn = document.querySelector("#tipCalculator");
const tip = document.querySelector("#tipTotal");
const tipPerPerson = document.querySelector("#tipPerPerson");

calculatorBtn.addEventListener('click', (event)=>{
    const billAmount = document.querySelector("#billAmount");
    const tipPercentage = document.querySelector("#tipPercentage");
    const noOfPeople = document.querySelector("#noOfPeople");

    const billAmountNum = Number(billAmount.value);
    const tipPercentageNum = Number(tipPercentage.value);
    const noOfPeopleNum = Number(noOfPeople.value);

    if(isNaN(billAmountNum) || isNaN(tipPercentageNum) || isNaN(noOfPeopleNum)){
        alert("plz fill the all field with valid number")
        return;
    }


    const totalTip = (billAmountNum * (tipPercentageNum/100)).toFixed(2);
    tip.innerText = `$${totalTip}`;
    
    tipPerPerson.innerText = `$${totalTip / noOfPeopleNum}`;
})
