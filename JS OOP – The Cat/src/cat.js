console.log('the cat');

class Cat {
    constructor(name, tiredness, hunger, loneliness, happiness) {
        this.name = name
        this.tiredness = tiredness
        this.hunger = hunger
        this.loneliness = loneliness
        this.happiness = happiness

        this.catStatus()
    }

    feed(amount = 1) {
        const increment = amount > 3 ? 2 : 1
        const action = 'eat'
        console.log(`\n-----${action} - ${amount}`);
        this.tiredness = this.increase(this.tiredness, increment, false)
        this.hunger = this.increase(this.hunger, -increment, ' is way too full to ' + action)
        this.loneliness = this.increase(this.loneliness, increment, false)
        this.happiness = this.increase(this.happiness, increment, false)
        this.catStatus()
    }

    sleep(sleepTime = 8) {
        const increment = sleepTime > 12 ? 2 : 1
        // this.changeVals(increment, 'sleep')
        const action = 'sleep'
        console.log(`\n-----${action} - ${sleepTime}`);
        this.tiredness = this.increase(this.tiredness, -increment, ' is way too awake to ' + action)
        this.hunger = this.increase(this.hunger, increment, false)
        this.loneliness = this.increase(this.loneliness, increment, false)
        this.happiness = this.increase(this.happiness, increment, false)
        this.catStatus()
    }

    pet(petTime = 0.5) {
        const increment = petTime > 1 ? 2 : 1
        const action = 'pet'
        console.log(`\n-----${action} - ${petTime}`);
        this.tiredness = this.increase(this.tiredness, increment, false)
        this.hunger = this.increase(this.hunger, increment, false)
        this.loneliness = this.increase(this.loneliness, -increment, ' is way too social to ' + action)
        this.happiness = this.increase(this.happiness, increment, false)
        this.catStatus()
    }

    play(playTime = 1) {
        const increment = playTime > 3 ? 2 : 1
        const action = 'play'
        console.log(`\n-----${action} - ${playTime}`);
        this.tiredness = this.increase(this.tiredness, increment, false)
        this.hunger = this.increase(this.hunger, increment, false)
        this.loneliness = this.increase(-this.loneliness, -increment, ' doesn\'t want to ' + action + ' right now')
        this.happiness = this.increase(this.happiness, increment, false)
        // this.tiredness = this.increase(this.tiredness, increment, ' is way too awake to ' + action)
        // this.hunger = this.increase(this.hunger, increment, ' is way too full to ' + action)
        // this.loneliness = this.increase(this.loneliness, -increment, ' is way too lonely to ' + action)
        // this.happiness = this.increase(this.happiness, increment, ' doesn\'t want to ' + action + ' right now')
        this.catStatus()
    }

    catStatus() {
        console.table(this);

        this.getStatus(this.tiredness, 'awake' , 'tired')
        this.getStatus(this.hunger, 'saturated' , 'hungry')
        this.getStatus(this.loneliness, 'social' , 'lonely', ' feels')
        this.getStatus(this.happiness, 'unhappy' , 'happy')

    }

    increase(prop, increment, tooMuch) {
        // console.log(`${prop} - ${increment}`);
        prop += increment

        if(prop > 10) {
            // console.log(this.name + tooMuch);
            return 10
        } else if(prop <= 0 && tooMuch) {
            console.log(this.name + tooMuch);
            return 0            
        }

        return prop
    }

    getStatus(val, lowStatusText, highStatusText, prefix = ' is') {
        let status = this.name + prefix
        if(val === 5) status += ` neither ${lowStatusText} nor ${highStatusText}`
        else {
            if( val > 8 || val <3) status += ' very'
            status += ` ${val < 5 ? lowStatusText : highStatusText}`
        }

        console.log(status);

        return status;
    }
}

const randomVal = max => Math.floor(Math.random() * max)

const fluffy = new Cat('Fluffy', randomVal(10), randomVal(10), randomVal(10), randomVal(10))

fluffy.feed()
fluffy.play()
fluffy.sleep(15)
fluffy.feed(5)
fluffy.feed(5)
fluffy.feed(5)
fluffy.feed(5)
fluffy.feed(5)
fluffy.play()
fluffy.play()
fluffy.play()
fluffy.play()
fluffy.play()
fluffy.play()
fluffy.play()
fluffy.play()
fluffy.play()