"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }Object.defineProperty(exports, "__esModule", {value: true});var _sequelize = require('sequelize');
var _Subscription = require('../models/Subscription'); var _Subscription2 = _interopRequireDefault(_Subscription);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Meetup = require('../models/Meetup'); var _Meetup2 = _interopRequireDefault(_Meetup);

var _SubscriptionMail = require('../jobs/SubscriptionMail'); var _SubscriptionMail2 = _interopRequireDefault(_SubscriptionMail);
var _Queue = require('../../lib/Queue'); var _Queue2 = _interopRequireDefault(_Queue);

class SubscriptionController {
  async index(req, res) {
    const subscriptions = await _Subscription2.default.findAll({
      where: {
        user_id: req.userId,
      },
      include: [
        {
          model: _Meetup2.default,
          where: {
            date: {
              [_sequelize.Op.gt]: new Date(),
            },
          },
          required: true,
        },
      ],
      order: [[_Meetup2.default, 'date']],
    });

    return res.json(subscriptions);
  }

  async store(req, res) {
    const user = await _User2.default.findByPk(req.userId);

    const meetup = await _Meetup2.default.findByPk(req.params.meetupId, {
      include: [_User2.default],
    });

    if (!meetup) {
      return res.status(400).json({ error: 'Meetup not exists' });
    }

    if (meetup.past) {
      return res.status(400).json({ error: "Can't subscribe to past meetups" });
    }

    const checkDate = await _Subscription2.default.findOne({
      where: {
        user_id: user.id,
      },
      include: [
        {
          model: _Meetup2.default,
          required: true,
          where: {
            date: meetup.date,
          },
        },
      ],
    });

    if (checkDate) {
      return res
        .status(400)
        .json({ error: "Can't subscribe to two meetups at the same time" });
    }

    const mailData = {
      subscription: {
        organizer: {
          name: meetup.User.name,
          email: meetup.User.email,
        },
        User: {
          name: user.name,
          email: user.email,
        },
        meetup: {
          title: meetup.title,
          date: meetup.date,
        },
      },
    };

    await _Queue2.default.add(_SubscriptionMail2.default.key, mailData);

    const subscription = await _Subscription2.default.create({
      user_id: user.id,
      meetup_id: meetup.id,
    });

    return res.json(subscription);
  }
}

exports. default = new SubscriptionController();
