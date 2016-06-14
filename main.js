var Schema = require("graphql");

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
        population: In
    }

    type Query {
        film (id: Int): Film
        person (id: Int): Person
    }

`,{
    Date: {

    },
    Character: {

    },
    Film: {
        
    },
    Planet: {

    },
    Query: {

    }
});

//schema(<query>, <variables>)
//.then(function (res){
//    console.log(res);
//});
