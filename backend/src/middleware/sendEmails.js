const nodemailer = require('nodemailer')

module.exports = {

    transporter: nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'estagio.integrado.ei@gmail.com',
            pass: ''
        },
        logger: true,
        debug: true // include SMTP traffic in the logs
    }, {
        from: 'Estágio Integrado <estagio.integrado.ei@gmail.com>',
    }),
    async base(message) {
        nodemailer.createTestAccount((err, account) => {

            let transporter = this.transporter;

            transporter.sendMail(message, (error, info) => {
                if (error) {
                    console.error(error.message);
                    process.exit(1)
                }
                console.log('Enviado com sucesso: %s', info.messageId);
                transporter.close();
            });
        })
    },
    async confirm(host, clientName, email, token) {

        link = `http://${host}/user/confirmation/${token}/${email}`
        let message = {
            to: `${clientName} ${email}`,
            subject: 'Bem-vind@ ao App Estágio Integrado',
            text: `Olá, ${clientName}! Gostaríamos de informar que sua conta está prestes a ser ativada. Mas para isto, você deve acessar seu link de ativação, através do link: ${link}. Depois de confirmada, a administração do aplicativo irá conceder seu acesso ao aplicativo. Até breve! Atenciosamente, equipe Estágio Integrado :) `,
            html: `<h1>Olá, ${clientName}!</h1> 
            <p>Gostaríamos de informar que sua conta está prestes a ser ativada.</p>
            <p>Mas para isto, você deve acessar seu link de ativação, clicando <a href="${link}" target="_blank">aqui.</a></p>
            <p> Depois de confirmada, a administração do aplicativo irá conceder seu acesso ao aplicativo.</p>
            <p>Até breve,</p>
            <p>Equipe Estágio Integrado :)</p>`
        }

        this.base(message)
    },
    async verified(host, clientName, email, token) {

        link = `http://${host}/user/confirmation/${token}/${email}`
        let message = {
            to: `${clientName} ${email}`,
            subject: 'Bem-vind@ ao App Estágio Integrado',
            text: `Olá, ${clientName}! Gostaríamos de informar que sua conta foi ativada pela administração. Caso já tenha confirmado seu e-mail, seu acesso ao aplicativo está pronto. Até breve, Equipe Estágio Integrado`,
            html: `<h1>Olá, ${clientName}!</h1> 
            <p>Gostaríamos de informar que sua conta foi ativada pela administração.</p>
            <p>Caso já tenha confirmado seu e-mail, seu acesso ao aplicativo está pronto.</p>
            <p>Até breve,</p>
            <p>Equipe Estágio Integrado :)</p>`
        }

        this.base(message)
    },

}