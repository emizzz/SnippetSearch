
class Scraper{
    constructor(){
        this.cors_service = "http://api.allorigins.win/get?url=";
        this.search_engine_url =  this.cors_service + "https://www.google.com/search?q=site%3Astackoverflow.com"
    }

    async send_request(query, type="url"){
        query = (type === "query" ?  this.queryEncode(query) : query )
        query = (type === "query" ? `${this.search_engine_url}+${query}` : `${this.cors_service}+${query}` )
        let res = null
        
        try{
            res = await fetch(query);
            res = await res.json();
        }
        catch(err){
            console.error("failed to fetch resources' " + err.message)
        }
        return res
    }
    
    async search(query){
        let html_sections = []
        let response = []
        
        try{
            let raw_data = await this.send_request(query, "query")
            let links = this.parse_useful_links(raw_data.contents)

            html_sections = await Promise.all(links.map(async (link) => {
                return await this.send_request(link, "url")
            }));
            html_sections = html_sections.map(function (d) { return d.contents; });

            let codes = html_sections.map( (d) => { return this.parse_useful_code(d); });

            // response creation
            for(let i = 0; i < links.length; i++){
                if(codes[i].length > 0){
                    response.push({
                        link: links[i],
                        id: links[i].match(new RegExp("questions/(.*)/"))[1],
                        code: codes[i]
                    });
                }
            }

        }
        catch(err){
            console.error("failed to fetch resources' " + err.message)
        }

        return response
    }

    queryEncode(query){
        query = encodeURIComponent(query)  
        query = query.replace('%20', '+')                                                           // I think this is a Google convention...
        return query
    }

    /*
        this methods find the useful stackoverflow links from the google search engine results
    */
    parse_useful_links(data){
        let html = new DOMParser().parseFromString(data, "text/html");
        let links = html.getElementsByTagName('a');                                                 // get only the links
        links = [...links].map(function (d) { return d.href });                                     // get only the links urls
        links = links.filter(function (d) { return d.includes("stackoverflow.com/questions");  });  // get only stackoverflow urls
        links = links.map(function (d) { return d.split('/url?q=')[1];  });                         // drop the localhost part
        return links
    }

    /*
        this methods find the useful code sections from a stackoverflow page
        (only the accepted answers)
    */
    parse_useful_code(data){
        let html = new DOMParser().parseFromString(data, "text/html");        
        let code = html.getElementsByClassName('answer accepted-answer');  

        if (code.length > 0){
            code = code[0]      
            code = code.getElementsByTagName('code');     
            code = [...code].map(function (d) { return d.outerText;  });   
            code = code.filter(function (d) { return d.length > 30;  });  
            return code                     
        }

        return []
    }

   
}

export default Scraper