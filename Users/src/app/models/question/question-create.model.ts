export class QuestionCreate {

    constructor(
        public   qnId: number,
        public   answer: number,      
        public   activeind: number,
        public   updateDate: Date,
        public   applicationUserId: number,
        public   photoId: number,  
        public   qn?: any,
        public   imageName?: any,
        public   option1?: any,
        public   option2?: any,
        public   option3?: any,
        public   option4?: any,  
        public deleteConfirm: boolean = false,
    ) {}

}