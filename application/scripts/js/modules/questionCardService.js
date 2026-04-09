const keys = ['option_a', 'option_b', 'option_c', 'option_d'];

const generateQuestions = (questions) =>
{
    return questions.map(question => {
        const { question_id: id, question_text: text, options } = question;
        return `
            <div class="card mb-4 shadow-sm">
                <div class="card-header bg-light"><b>${text}</b></div>
                <div class="card-body">
                    ${keys.map(key => `
                        <div class="form-check my-2">
                            <input class="form-check-input" type="radio" name="question_${id}" 
                                   value="${key}" id="q${id}_${key}" required>
                            <label class="form-check-label" for="q${id}_${key}">${options[key]}</label>
                        </div>
                    `).join('')}
                </div>
            </div>`;
    }).join(' ')
}

export default generateQuestions;