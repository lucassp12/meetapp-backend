"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _datefns = require('date-fns');
var _pt = require('date-fns/locale/pt'); var _pt2 = _interopRequireDefault(_pt);
var _Mail = require('../../lib/Mail'); var _Mail2 = _interopRequireDefault(_Mail);

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { subscription } = data;
    await _Mail2.default.sendMail({
      to: `${subscription.organizer.name} <${subscription.organizer.email}>`,
      subject: `Nova inscrição, ${subscription.meetup.title}`,
      template: 'subscription',
      context: {
        organizer: subscription.organizer.name,
        user: subscription.User.name,
        email: subscription.User.email,
        date: _datefns.format.call(void 0, 
          _datefns.parseISO.call(void 0, subscription.meetup.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: _pt2.default,
          }
        ),
      },
    });
  }
}

exports. default = new SubscriptionMail();
