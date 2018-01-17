var stripe = require('stripe')('sk_test_F5yZ2CmKqVwJg7OpQrc4EIvt');


module.exports = function (context, req) {
    context.log('starting to get down.');
    if( req.body && req.body.stripeEmail &&
        req.body.stripeToken && req.body.stripeAmt ) {
            stripe.customers
                .create({
                    email: req.body.stripeEmail,
                    source: req.body.strikeToken
                })
                .then( customer => {
                    context.log('starting the stripe charges');
                    stripe.charges.create({
                        amount: req.body.stripeAmt,
                        description: 'Sample Charge',
                        currency: 'usd',
                        customer: customer.id
                    });
                })
                .then ( charge => {
                    context.log('finsihed teh stripe charges');
                    context.res = {
                        body: 'This has completed'
                    };
                    context.done();
                })
                .catch( err => {
                    context.log(err);
                    context.done();
                });
    } else {
        context.log( req, body );
        context.res = {
            status: 400,
            body: "We're missing something"
        };
        context.done();
    }

};
