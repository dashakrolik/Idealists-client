
export const baseUrl = "https://the-idealists-backend.herokuapp.com";

export const data = {
	questionsVersion: '1.0',
	questionGroups: [
		{
			questionGroupId: '1',
			questions: [
				{
					questionId: '1',
					'questionType:': 'regularTextField',
					questionText: 'First name',
					questionHint: 'Your first name',
					minChar: '0',
					maxChar: '120',
					validateAs: 'name',
					isRequired: 'true',
					errorMessage: "That's not a name."
				},
				{
					questionId: '2',
					'questionType:': 'regularTextField',
					questionText: 'Email',
					questionHint: 'Your first name',
					minChar: '0',
					maxChar: '120',
					validateAs: 'mail',
					isRequired: 'true',
					errorMessage: "That's not a name."
				}
			]
		},
		{
			questionGroupId: '2',
			questions: [
				{
					questionId: '123456',
					'questionType:': 'regularTextField',
					questionText: 'First name',
					questionHint: 'Your first name',
					minChar: '0',
					maxChar: '120',
					validateAs: 'name',
					isRequired: 'true',
					errorMessage: "That's not a name."
				},
				{
					questionId: '123456',
					'questionType:': 'regularTextField',
					questionText: 'First name',
					questionHint: 'Your first name',
					minChar: '0',
					maxChar: '120',
					validateAs: 'name',
					isRequired: 'true',
					errorMessage: "That's not a name."
				}
			]
		}
	]
};
