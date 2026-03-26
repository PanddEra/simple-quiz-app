const keys = ['option_a', 'option_b', 'option_c', 'option_d'];

const questionCardService = {
    generateQuestions: (questions) => questions.map(q => {
        const { question_id: id, question_text: text, options } = q;
        return `
            <div class="card mb-3">
                <div class="card-header"><b>${text}</b></div>
                <div class="card-body">
                    ${keys.map(key => `
                        <div class="form-check">
                            <input class="form-check-input" type="radio" name="question_${id}" 
                                   value="${key}" id="q${id}_${key}" required>
                            <label class="form-check-label" for="q${id}_${key}">${options[key]}</label>
                        </div>
                    `).join('')}
                </div>
            </div>`;
    }).join('')
};

export default questionCardService;