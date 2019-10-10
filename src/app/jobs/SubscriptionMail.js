import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class SubscriptionMail {
  get key() {
    return 'SubscriptionMail';
  }

  async handle({ data }) {
    const { subscription } = data;
    await Mail.sendMail({
      to: `${subscription.organizer.name} <${subscription.organizer.email}>`,
      subject: `Nova inscrição, ${subscription.meetup.title}`,
      template: 'subscription',
      context: {
        organizer: subscription.organizer.name,
        user: subscription.User.name,
        email: subscription.User.email,
        date: format(
          parseISO(subscription.meetup.date),
          "'dia' dd 'de' MMMM', às' H:mm'h'",
          {
            locale: pt,
          }
        ),
      },
    });
  }
}

export default new SubscriptionMail();
