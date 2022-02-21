const convertToMathValues = async(inputValue, output) => {
    const display = document.getElementById("display");
    display.disabled = true;
    const displayField = output == "" || output == null || output == "undefined" ? document.querySelector('.display-field') : output;
    displayField.innerHTML = '';
    MathJax.texReset();
    const options = MathJax.getMetricsFor(displayField);
    options.display = display.checked;
    try {
        const node = await MathJax.tex2svgPromise(inputValue, options);
        displayField.appendChild(node);
        MathJax.startup.document.clear();
        MathJax.startup.document.updateDocument();
    } catch (error) {
        displayField.appendChild(document.createElement('pre')).appendChild(document.createTextNode(error.message));

    };
    display.disabled = false;
};

//alert modal
const closeBtn = document.querySelector(".closebtn");
const container = document.querySelector('.container')
container.addEventListener('click', e => {
        if (e.target.className == closeBtn.className) {
            const parent = e.target.parentElement;
            // parent.style.opacity = "0";
            setTimeout(() => {
                parent.classList.remove('show');
                parent.classList.add('hide');
                textArea.removeAttribute('disabled');
                optionA.removeAttribute('disabled');
                optionB.removeAttribute('disabled');
                optionC.removeAttribute('disabled');
                optionD.removeAttribute('disabled');
                answer.removeAttribute('disabled');
                furtherExplanation.setAttribute('disabled', "");
            }, 200);
        }
    })
    //question and answer bucket 
let questionData = {}

const textArea = document.querySelector('#textarea-input');
const optionA = document.querySelector('#option-a');
const optionB = document.querySelector('#option-b');
const optionC = document.querySelector('#option-c');
const optionD = document.querySelector('#option-d');
const answer = document.querySelector('#answer');
const furtherExplanation = document.querySelector('#further-explanation');
const formInput = document.querySelector("#form-input");
const finalPreviewOutput = document.querySelector("#final-preview");

const processData = () => {
    //default for further explanation
    furtherExplanation.value = furtherExplanation.value != "" ? furtherExplanation.value : furtherExplanation.getAttribute('placeholder');
    const questionDataInputs = [textArea, optionA, optionB, optionC, optionD, answer, furtherExplanation];
    //loop through the input blocks
    questionDataInputs.forEach(input => {
        const getKey = input.previousElementSibling.innerHTML
        const getValue = input.value;
        //add to question data
        questionData[getKey] = getValue;

    });
};
//check empty values

//get final preview 
const finalPreview = async inputObj => {
    //get node of outputs for final previews
    const q = document.querySelector('.q p');
    const qs = document.querySelector('.q span');
    const optA = document.querySelector('.opt-a p');
    const optAs = document.querySelector('.opt-a span');
    const optB = document.querySelector('.opt-b p');
    const optBs = document.querySelector('.opt-b span');
    const optC = document.querySelector('.opt-c p');
    const optCs = document.querySelector('.opt-c span');
    const optD = document.querySelector('.opt-d p');
    const optDs = document.querySelector('.opt-d span');
    const ans = document.querySelector('.ans p');
    const ansS = document.querySelector('.ans span');
    const fe = document.querySelector('.fe p');
    const feS = document.querySelector('.fe span');
    //output bucket
    const outputsBucket = [q, optA, optB, optC, optD, ans, fe];
    const outputsBucketKey = [qs, optAs, optBs, optCs, optDs, ansS, feS];

    //call process data
    processData();

    //validates if there is no empty field
    const validSubmission = textArea.value != null ? textArea.value : optionA.value != null ? optionA.value : optionB.value != null ? optionB.value : optionC.value != null ? optionC.value : optionD.value != null ? optionD.value : answer.value != null ? answer.value : furtherExplanation.value != null ? furtherExplanation.value : null;
    if (validSubmission) {
        //loop through question and append child node to preview output
        let count = 0;
        for (let [dataKey, dataValue] of Object.entries(questionData)) {
            outputsBucketKey[count].innerHTML = `${dataKey} .`;
            await convertToMathValues(dataValue, outputsBucket[count])
            count += 1;
        }
    } else {
        const closeX = document.querySelector(".closebtn")
        closeX.parentElement.classList.toggle('hide');
        closeX.parentElement.classList.toggle('show');
        closeX.parentElement.innerHTML = `<strong>All fields are required!</strong><span class="closebtn">&times;</span>`;
        //disable all other buttons

        textArea.setAttribute('disabled', "");
        optionA.setAttribute('disabled', "");
        optionB.setAttribute('disabled', "");
        optionC.setAttribute('disabled', "");
        optionD.setAttribute('disabled', "");
        answer.setAttribute('disabled', "");
        furtherExplanation.setAttribute('disabled', "");
        return
    }

};
//event listener to submit form values
formInput.addEventListener('submit', event => {
    event.preventDefault();
    //call processData
    processData();

});
//add event listener on textarea on key press or key down
textArea.addEventListener('keyup', async event => {
    const inputValue = textArea.value.trim();
    await convertToMathValues(inputValue);
});
//add event listener on optionA on key press or key down
optionA.addEventListener('keyup', async event => {
    const inputValue = optionA.value.trim();
    await convertToMathValues(inputValue);
});
//add event listener on optionB on key press or key down
optionB.addEventListener('keyup', async event => {
    const inputValue = optionB.value.trim();
    await convertToMathValues(inputValue);
});
//add event listener on optionC on key press or key down
optionC.addEventListener('keyup', async event => {
    const inputValue = optionC.value.trim();
    await convertToMathValues(inputValue);
});
//add event listener on optionD on key press or key down
optionD.addEventListener('keyup', async event => {
    const inputValue = optionD.value.trim();
    await convertToMathValues(inputValue);
});
//add event listener on answer on key press or key down
answer.addEventListener('keyup', async event => {
    const inputValue = answer.value.trim();
    await convertToMathValues(inputValue);
});
//add event listener on furtherExplanation on key press or key down
furtherExplanation.addEventListener('keyup', async event => {
    const inputValue = furtherExplanation.value.trim();
    await convertToMathValues(inputValue);
});
//add event listener on finalPreviewOutput on key press or key down
finalPreviewOutput.addEventListener('click', async event => {

    //call finalPreview
    finalPreview(questionData);
});