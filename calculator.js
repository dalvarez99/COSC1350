window.addEventListener("load", function() {
    let bill = document.getElementById("bill");

    let service = document.getElementById("service");

    let calculate = document.getElementById("calculate");

    let output = document.getElementById("output");

    calculate.addEventListener("click", function() {

        if (bill.value ==="") {
            output.textContent = "Please enter a bill amount.";
            return;
        }

        let billAmount = parseFloat(bill.value);

        let serviceQuality = parseFloat(service.value);

        let tip = billAmount * serviceQuality;

        output.textContent = "Tip: $" + tip.toFixed(2);

    });

});

    