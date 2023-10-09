const Event = require('../modals/Event')
const User = require('../modals/user')

exports.addevent = async (req,res) => {
    const { type, date, time, guests, venue, budget, postedBy } = req.body;
    
    try {
        
        const e = new Event({ type, date, time, guests, venue, budget, postedBy });
        
        const event = await e.save();

        res.status(201).json({event, message: "Event Created Successfully"})
    } 
    catch (error) {
        res.status(409).json({message: "Error! Try again later", error});
    }
}

exports.addfood = async (req,res) => {

    try {
        const dishes = req.body.selected;
        const cost = req.body.price;

        const eventFood = await Event.findByIdAndUpdate(req.params.id, {dishes,cost},{new:true})
        
        res.status(200).json({eventFood, message: "Food Posted Successfully"})

    } catch (error) {
        res.status(409).json({message: "Error! Try again later", error});
    }
}

exports.addDecor = async (req, res) => {
    try {
        const decor = req.body.selected;
        const decorCost = req.body.totalCost;

        // Use findById to find the event by its unique _id
        const e = await Event.findById(req.params.id);

        if (!e) {
            return res.status(404).json({ message: "Event not found" });
        }

        let cost = decorCost + e.cost;

        // Use findOneAndUpdate to update the event
        const eventDecor = await Event.findOneAndUpdate(
            { _id: req.params.id },
            {
                $set: {
                    decors: decor,
                    cost: cost,
                    posted: true
                }
            },
            { new: true }
        );

        console.log(eventDecor);

        res.status(200).json({ eventDecor, message: "Decor Posted Successfully" });
    } 
    catch (error) 
    {
        res.status(409).json({ message: "Error! Try again later", error });
    }
};

exports.getResponses = async (req,res) => {
    try 
    {
        const user = await User.findById(req.params.id)
        const email = user.email
        console.log(email)
        
        const events = await Event.find({postedBy:email})
        console.log(events);
        
        res.status(200).json({events})    
    } 
    catch (error) 
    {   
        res.status(409).json({message: "Error! Try again later", error});
    } 
}
exports.getEvents = async (req,res) => {
    try 
    {
        const events = await Event.find({posted : true})
        res.status(200).json(events)  
    } 
    catch (error) 
    {   
        res.status(409).json({message: "Error! Try again later", error});
    } 
}

exports.registerResponses = async (req,res) => {
    try {
        
        const {cId, price} = req.body
        console.log(cId, price);

        const company = await Company.findById(cId)
        const email = company.email

        const combine = {email:email , price:price}
        console.log(combine)
        const event = await Event.findByIdAndUpdate(
            req.params.id,
            {$push: {responses: combine}},
            {new:true}
            )
        // event.responses.push(combine)
        console.log(event);

        res.status(200).json({event, message: "Response Posted Successfully" })
    } catch (error) {
        
        res.status(409).json({message: "Error! Try again later", error});
    }
}
