/*

https://api.stackexchange.com/2.2/search/advanced?order=desc&sort=relevance&accepted=True&answers=1&site=stackoverflow&q=bootstrap+equal+height+columns*/

class Api{
    constructor(){
        this.base_url = 'https://api.stackexchange.com/2.2/'
        this.end_url = '&site=stackoverflow'
    }

    /* 
    PUBLIC METHODS
    */
    async search(query) {

        query = encodeURIComponent(query)        
        let questions = await this.searchQuestion(query)
        let accepted_answers_id = questions.map(function (d) { return d.accepted_answer_id });
        let answers = await this.getAnswersById(accepted_answers_id)
        
        let questions_and_answers = questions.map(obj => {
            let data = answers.find(item => item.question_id === obj.question_id);
            return {...obj, ...data}
        });
        
        return questions_and_answers
    }


    /* 
    PRIVATE METHODS
    */

    // TODO: optimize custom filters
    async getAnswersById(ids){
        let data = null;
        try{
            data = await fetch(`${this.base_url}answers/${ids.join(';')}?order=desc&filter=withbody${this.end_url}`);
            data = await data.json();
            data = data.items
             
            data = data.map(({question_id, answer_id, body }) => ({
                question_id, answer_id, body
            }));

        }
        catch(err){
            console.error("failed to fetch resources in function 'getAnswersById' " + err.message)
        }
        return data
    }

    async searchQuestion(query){
        let data = null;

        try{
            data = await fetch(`${this.base_url}search/advanced?order=desc&sort=relevance&accepted=True&answers=1&q=${query}${this.end_url}`)

            data = await data.json();
            data = data.items //.slice(0, 10); // TODO delete slice?
            
            data = data.map(({question_id, title, link, score, accepted_answer_id }) => ({
                question_id, title, link, score, accepted_answer_id
            }));


            //data = data.map(function (d) { return d.accepted_answer_id });
            //data = data.filter(function (d) { return d != undefined; });
            
        }
        catch(err){
            console.error("failed to fetch resources in function 'searchQuestion' " + err.message)
        }
        
        return data
    }

    
}

export default Api