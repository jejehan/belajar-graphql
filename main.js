var Schema = require("graph.ql");

var schema = Schema(`

    scalar Date

    type Character {
        name: String!
        homeworld: Planet
        films: [Film]
    }

    type Film {
        title: String!
        producers: [String]
        characters: [Character]
        release_date: Date
    }

    type Planet {
        name: String!
        population: Int
    }

    type Query {
        find_film (id: Int): Film
        find_character (id: Int): Character
    }

`,{
    Date: {
        serialize: function(v){
            return new Date(v);
        }
    },
    Character: {

    },
    Film: {

    },
    Planet: {

    },
    Query: {
        /*
         * query = type Query
         * args = parameter cth. id: Int
         */
        find_film (query, args){
            return {
                title: 'Jason Bourne',
                producers: ['matt','damon','zeihan'],
                release_date: '2006-01-07'
            }
        },
        find_character (query, args){
            console.log(query, args);
        }
    }
});

schema(`
    query find($film: Int){
        find_film(id: $film){
            title
            producers
            release_date
        }
    }
`,{
    film: 1
}).then(function (res){
    console.dir(res, {colors: true, depth: Infinity});
});

//schema(<query>, <variables>)
//.then(function (res){
//    console.log(res);
//});
