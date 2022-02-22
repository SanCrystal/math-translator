$(document).ready(function() {
    //question and answer bucket 
    let questionData = {}
    const examYear = document.querySelector('#exam-year');
    const examType = document.querySelector('#exam-type');
    const subject = document.querySelector('#subject');

    const textArea = document.querySelector('#textarea-input');
    const optionA = document.querySelector('#option-a');
    const optionB = document.querySelector('#option-b');
    const optionC = document.querySelector('#option-c');
    const optionD = document.querySelector('#option-d');
    const answer = document.querySelector('#answer');
    const furtherExplanation = document.querySelector('#further-explanation');
    const formInput = document.querySelector("#form-input");
    const finalPreviewBtn = document.querySelector("#final-preview");
    const finalPreviewOutput = document.querySelector(".final-preview");
    const displayF = document.querySelector('.display-field')

    console.log(examType.value)
        //convert to math values
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
    //alert status
    const reportStatus = (data) => {
            if (data.status == 200) {
                const successAlert = document.querySelector(".success");
                successAlert.classList.remove("hide");
                successAlert.classList.add("show")
                successAlert.innerHTML = `<strong>${data.message}</strong><span class="closebtn">&times;</span>`

            } else if (data.status == 500) {
                const errorAlert = document.querySelector(".error");
                errorAlert.classList.remove("hide");
                errorAlert.classList.add("show")
                errorAlert.innerHTML = `<strong>${data.message}</strong><span class="closebtn">&times;</span>`

            }
        }
        //alert modal
    const closeBtn = document.querySelector(".closebtn");
    const confirm = document.querySelector(".confirm");
    const container = document.querySelector('.container')
    container.addEventListener('click', e => {
        if ((e.target.className == closeBtn.className) || (e.target.className == confirm.className)) {
            const parent = e.target.parentElement;
            const success = parent.classList.contains("success")
            const submitted = parent.classList.contains("confirm")
                // parent.style.opacity = "0";
            if (success || submitted) {
                textArea.value = "";
                optionA.value = "";
                optionB.value = "";
                optionC.value = "";
                optionD.value = "";
                answer.value = "";
                furtherExplanation.value = "";
                displayF.innerHTML = "<p>Live Preview</p>";
                finalPreviewOutput.innerHTML = "<p>Final Preview</p>";
            }
            setTimeout(() => {
                parent.classList.remove('show');
                parent.classList.add('hide');
                //class enable fields
                enableFields();
            }, 200);

        }
    })


    const processData = () => {
        //default for further explanation
        furtherExplanation.value = furtherExplanation.value != "" ? furtherExplanation.value : furtherExplanation.getAttribute('placeholder');
        const questionDataInputs = [examYear, examType, subject, textArea, optionA, optionB, optionC, optionD, answer, furtherExplanation];
        //loop through the input blocks
        questionDataInputs.forEach(input => {
            const getKey = input.previousElementSibling ? input.previousElementSibling.innerHTML.trim().replace(" ", "") : input.parentElement.previousElementSibling.innerHTML.trim().replace(" ", "");
            const getValue = input.value != "" && input.value != "---" ? input.value : null;
            //add to question data
            if (getValue) {
                questionData[getKey] = getValue;
            } else {
                //empty questionData bucket 
                questionData = {};
                reportStatus({ message: `Error! value of ${getKey} is required!`, status: 500 });
                return
            }

        });
    };
    const disableFields = () => {
        examType.setAttribute('disabled', "");
        examYear.setAttribute('disabled', "");
        subject.setAttribute('disabled', "");
        textArea.setAttribute('disabled', "");
        optionA.setAttribute('disabled', "");
        optionB.setAttribute('disabled', "");
        optionC.setAttribute('disabled', "");
        optionD.setAttribute('disabled', "");
        answer.setAttribute('disabled', "");
        furtherExplanation.setAttribute('disabled', "");
    };
    const enableFields = () => {
            document.querySelector('#exam-year').removeAttribute('disabled')
            document.querySelector('#exam-type').removeAttribute('disabled')
            document.querySelector('#subject').removeAttribute('disabled')
            document.querySelector('#textarea-input').removeAttribute('disabled')
            document.querySelector('#option-a').removeAttribute('disabled')
            document.querySelector('#option-b').removeAttribute('disabled')
            document.querySelector('#option-c').removeAttribute('disabled')
            document.querySelector('#option-d').removeAttribute('disabled')
            document.querySelector('#answer').removeAttribute('disabled')
            document.querySelector('#further-explanation').removeAttribute('disabled')

        }
        //check empty values

    //get final preview 
    const finalPreview = async inputObj => {
        //get node of outputs for final previews ::note keys pairs are oupted in the span tag and values on the p tag denoted with s and p in the variable declarations

        const eYear = document.querySelector('.eyear p');
        const eYears = document.querySelector('.eyear span');
        const eType = document.querySelector('.etype p');
        const eTypes = document.querySelector('.etype span');
        const eSub = document.querySelector('.esub p');
        const eSubs = document.querySelector('.esub span');
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
        const outputsBucket = [eYear, eType, eSub, q, optA, optB, optC, optD, ans, fe];
        const outputsBucketKey = [eYears, eTypes, eSubs, qs, optAs, optBs, optCs, optDs, ansS, feS];

        //call process data
        processData();

        //validates if there is no empty field
        const fieldItems = [examYear.value, examType.value, subject.value, textArea.value, optionA.value, optionB.value, optionC.value, optionD.value, answer.value, furtherExplanation.value];
        const filtered = fieldItems.filter(e => !(e.length == 0 || e == "---"))
        const validSubmission = fieldItems.length == filtered.length ? true : false;

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
            disableFields();
            return
        }

    };

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
    finalPreviewBtn.addEventListener('click', async event => {

        //call finalPreview
        finalPreview(questionData);
    });

    //add event listener on submit 
    formInput.addEventListener("submit", e => {
        e.preventDefault();
        //call processData
        processData();
        const submit = document.querySelector(".submit")
        const confirm = document.querySelector(".confirm");
        disableFields();
        submit.classList.remove("hide");
        confirm.addEventListener('click', async e => {
            const request = await $.ajax({
                url: "/questions",
                type: "POST",
                contentType: "application/json",
                dataType: "JSON",
                data: JSON.stringify(questionData),
                success: function(data) {
                    reportStatus(data)
                    disableFields();
                },
                error: function(data) {
                    reportStatus(data)
                }
            })
        })

    })
})