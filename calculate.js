var readline = require('readline-sync');

const AVERAGE_GRADE_POINTS = [
    {
        grade: 0,
        points: 0
    },
    {
        grade: 1,
        points: 50
    },
    {
        grade: 2,
        points: 100
    },
    {
        grade: 3,
        points: 250
    },
    {
        grade: 4,
        points: 500
    }
]

const NUMBER_OF_REVIEWS = [
    {
        number: 0,
        points: 0
    },
    {
        number: 10,
        points: 50
    },
    {
        number: 50,
        points: 100
    },
    {
        number: 100,
        points: 250
    },
    {
        number: 250,
        points: 500
    }
]

// Points based on user's rank
const BRONZE = 1
const SILVER = 2
const GOLD = 3
const PLATINUM = 5
const DIAMOND = 10

// Points needed to reach flames for a place/POI/event
const ONE_FLAME = 500
const TWO_FLAMES = 1000
const THREE_FLAMES = 2000
const FOUR_FLAMES = 3500
const FIVE_FLAMES = 7000

// For the random run, the maximum amount of each variable
const MAX_BRONZE = 250
const MAX_SILVER = 250
const MAX_GOLD = 150
const MAX_PLATINUM = 75 
const MAX_DIAMOND = 25
const MAX_REVIEWS = 500

class Flames {

    constructor() {
        this.state = {
            averageGrade: 0,
            reviewsAmount: 0,
            people: 0,
            total: 0,
            var: 0
        }

        this.averageGrade = 0
        this.reviewsAmount = 0
        this.people = {
            total: 0,
            bronze: 0,
            silver: 0,
            gold: 0,
            platinum: 0,
            diamond: 0
        }
    }

    getAverageGradePoints() {

        // Get the amount of points from the average grade
    
        AVERAGE_GRADE_POINTS.map(item => {
            if (this.averageGrade >= item.grade) {
                this.state.var = item.points
            }
        })

        this.state.averageGrade = this.state.var
        this.state.var = 0

    }

    getReviewsAmountPoints() {

        // Get the amount of points from the reviews

        NUMBER_OF_REVIEWS.map(item => {
            if (this.reviewsAmount >= item.number) {
                this.state.var = item.points
            }
        })

        this.state.reviewsAmount = this.state.var
        this.state.var = 0

    }

    getPeoplePoints() {

        // Get the amount of points from the users attending

        this.state.people += (this.people.bronze * BRONZE)
        this.state.people += (this.people.silver * SILVER)
        this.state.people += (this.people.gold * GOLD)
        this.state.people += (this.people.platinum * PLATINUM)
        this.state.people += (this.people.diamond * DIAMOND)

    }

    getFlames() {

        // Translates the points to an amount of flames

        this.state.var = 0

        if (this.state.total < ONE_FLAME) {
            this.state.var = 0
        } else if (this.state.total > ONE_FLAME && this.state.total < TWO_FLAMES) {
            this.state.var = 1
        } else if (this.state.total > TWO_FLAMES && this.state.total < THREE_FLAMES) {
            this.state.var = 2
        } else if (this.state.total > THREE_FLAMES && this.state.total < FOUR_FLAMES) {
            this.state.var = 3
        } else if (this.state.total > FOUR_FLAMES && this.state.total < FIVE_FLAMES) {
            this.state.var = 4
        } else {
            this.state.var = 5
        }

        if (this.state.var > this.averageGrade) {
            if (this.averageGrade >= 0 && this.averageGrade < 1) {
                return 1
            } else if (this.averageGrade > 1 && this.averageGrade < 2) {
                return 2
            } else if (this.averageGrade > 2 && this.averageGrade < 3) {
                return 3
            } else if (this.averageGrade > 3 && this.averageGrade < 4) {
                return 4
            } else if (this.averageGrade > 4) {
                return 5
            }
        } else {
            return this.state.var
        }

    }

    getTotal() {

        // Calculate the total amount of points

        this.state.total = this.state.averageGrade + this.state.reviewsAmount + this.state.people
        this.state['flames'] = this.getFlames()
    }

    outputResults() {

        // Outputs the results

        console.log("Total amount of people: " + this.people.total)
        console.log("Bronze: " + this.people.bronze)
        console.log("Silver: " + this.people.silver)
        console.log("Gold: " + this.people.gold)
        console.log("Platinum: " + this.people.platinum)
        console.log("Diamond: " + this.people.diamond)
        console.log("\nTotal points: " + this.state.total)
        console.log("\nIf there is a party with " + this.people.total + " people, at a place with " + this.reviewsAmount + " reviews and an average grade of " + this.averageGrade + " the party will have " + this.state.flames + " flames.")
    }

    startFunction() {

        // Function that gets all the values and put them in the variables

        if (process.argv[2] === 'random') {

            this.people.bronze = Math.round(Math.random() * MAX_BRONZE)
            this.people.silver = Math.round(Math.random() * MAX_SILVER)
            this.people.gold = Math.round(Math.random() * MAX_GOLD)
            this.people.platinum = Math.round(Math.random() * MAX_PLATINUM)
            this.people.diamond = Math.round(Math.random() * MAX_DIAMOND)
            this.people.total =  this.people.bronze + this.people.silver + this.people.gold + this.people.platinum + this.people.diamond
            this.reviewsAmount = Math.round(Math.random() * MAX_REVIEWS)
            this.averageGrade =  Math.round(Math.random() * 50) / 10.0

        } else {

            this.people.total = parseInt(readline.question("How many people?\n"))

            this.people.bronze = parseInt(readline.question("How many bronze?\n"))
            this.people.bronze += parseInt(readline.question("How many bronze stories?\n"))

            this.people.silver = parseInt(readline.question("How many silver?\n"))
            this.people.silver += parseInt(readline.question("How many silver stories?\n"))

            this.people.gold = parseInt(readline.question("How many gold?\n"))
            this.people.gold += parseInt(readline.question("How many gold stories?\n"))

            this.people.platinum = parseInt(readline.question("How many platinum?\n"))
            this.people.platinum += parseInt(readline.question("How many platinum stories?\n"))

            this.people.diamond = parseInt(readline.question("How many diamond?\n"))
            this.people.diamond += parseInt(readline.question("How many diamond stories?\n"))

            this.reviewsAmount = parseInt(readline.question("How many reviews?\n"))
            this.averageGrade = parseFloat(readline.question("What is the average grade?\n"))

        }
    }

}

var f = new Flames()

f.startFunction()

f.getAverageGradePoints()
f.getReviewsAmountPoints()
f.getPeoplePoints()
f.getTotal()

f.outputResults()