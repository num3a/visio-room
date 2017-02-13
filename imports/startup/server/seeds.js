import { Meteor } from 'meteor/meteor';
import { Rooms } from '../../api/rooms/rooms';
import { Bookings } from '../../api/bookings/bookings';
import { Voucher } from '../../api/voucher/vouchers';
import moment from 'moment';

const generateBookings = (error, _id) => {
    if(error){
        console.log('Cannot generate bookings', error);
        return;
    }
    let room = Rooms.findOne(_id);
    let now = moment();
    now.set({'hour': 12, 'minutes': 0, 'second': 0, 'millisecond': 0});

    let bookingsCount = Bookings.find({ roomId: _id}).count();

    if( bookingsCount === 0){
        for(let i = 0; i < 500; i++) {
            Bookings.insert({
                roomId: _id,
                isBooked: false,
                isBlocked: false,
                bookingDate: now.add(1, 'days').toDate(),
                attendeeCount: 0,
                createdAt: new Date(),
                price: room.pricePerDay
            });
        }
    }
};

const generateVouchers = () => {
    var voucherCount = Voucher.find({}).count();

    if(voucherCount === 0){
        for(let i = 0; i < 500; i++) {
            let newCode = (new Date().getTime()).toString(36).toUpperCase();

                Voucher.insert({
                isValid: true,
                code: newCode,
                percentage: 50.0,
                createdAt: new Date()
            });
        }
    }
};

Meteor.startup(() =>{
    let roomsCount = Rooms.find({}).count();
    if(roomsCount === 0){
        Rooms.insert({
            location: [
                48.868172,
                2.334401,
            ],
            name: "Opera",
            address: "3 Avenue de l'Opéra, 75001 Paris",
            description: "Business Center Opéra vous accueille au 3 avenue de l\u2019Opéra \u2013 75001 Paris, au cœur du quartier d\u2019affaires parisien. \nBusiness Center Opéra offre :\nUne adresse valorisante de domiciliation\n2 étages de bureaux tout équipés de 1 à 4 postes de travail\n2 salles de réunion\nUne gamme complète de services\nBCO : une équipe expérimentée & un esprit club !",
            capacity: 5,
            pricePerDay: 149.9,
            contactEmail: 'ernest.emmanuel@hotmail.fr',
            administrator: ['eernest.pro@gmail.com', 'ernest.emmanuel@hotmail.fr']
        }, generateBookings);

        Rooms.insert({
            location: [
                48.868172,
                2.334401,
            ],
            name: "Opera 2",
            address: "3 Avenue de l'Opéra, 75001 Paris",
            description: "Business Center Opéra vous accueille au 3 avenue de l\u2019Opéra \u2013 75001 Paris, au cœur du quartier d\u2019affaires parisien. \nBusiness Center Opéra offre :\nUne adresse valorisante de domiciliation\n2 étages de bureaux tout équipés de 1 à 4 postes de travail\n2 salles de réunion\nUne gamme complète de services\nBCO : une équipe expérimentée & un esprit club !",
            capacity: 10,
            pricePerDay: 149.9,
            contactEmail: 'ernest.emmanuel@hotmail.fr',
            administrator: ['eernest.pro@gmail.com', 'ernest.emmanuel@hotmail.fr']
        }, generateBookings);

        Rooms.insert({
            location: [
                48.868172,
                2.334401,
            ],
            name: "Opera",
            address: "3 Avenue de l'Opéra, 75001 Paris",
            description: "Business Center Opéra vous accueille au 3 avenue de l\u2019Opéra \u2013 75001 Paris, au cœur du quartier d\u2019affaires parisien. \nBusiness Center Opéra offre :\nUne adresse valorisante de domiciliation\n2 étages de bureaux tout équipés de 1 à 4 postes de travail\n2 salles de réunion\nUne gamme complète de services\nBCO : une équipe expérimentée & un esprit club !",
            capacity: 5,
            pricePerDay: 149.9,
            contactEmail: 'ernest.emmanuel@hotmail.fr',
            administrator: ['eernest.pro@gmail.com', 'ernest.emmanuel@hotmail.fr']
        }, generateBookings);
    }

    generateVouchers();
});