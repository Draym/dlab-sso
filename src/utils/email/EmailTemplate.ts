export function welcomeMessage(code: number) {
    return formatHTMLMessage(
        code,
        "Register",
        "You can verify your email address to signup for Delysium game using the code above to complete the account setup.",
        "<a class=\"link\" href=\"https://www.delysium.com/account/register\" style=\"text-decoration: underline; color: #FAE232;\">sign up</a> again",
        "No account will be created.")
}

export function resetPasswordMessage(code: number) {
    return formatHTMLMessage(code,
        "Reset Password",
        "You can verify your email address to reset your password for Delysium game using the code above to complete the account update.",
        "try again",
        "No changes will be applied to your account.")
}

export function updateEmailMessage(code: number) {
    return formatHTMLMessage(code,
        "Update Email",
        "You can verify your email address to update your account's email for Delysium game using the code above to complete the account update.",
        "try again",
        "No changes will be applied to your account.")
}

export function updatePasswordMessage(code: number) {
    return formatHTMLMessage(code,
        "Update Password",
        "You can verify your email address to update your account's password for Delysium game using the code above to complete the account update.",
        "try again",
        "No changes will be applied to your account.")
}

export function bindWalletMessage(code: number) {
    return formatHTMLMessage(code,
        "Bind Wallet",
        "You can verify your email address to bind your wallet to Delysium game using the code above to complete the account update.",
        "try again",
        "No changes will be applied to your account.")
}

export function bindDiscordMessage(code: number) {
    return formatHTMLMessage(code,
        "Bind Discord",
        "You can verify your email address to bind your Discord to Delysium game using the code above to complete the account update.",
        "try again",
        "No changes will be applied to your account.")
}


function formatHTMLMessage(code: number, target: string, utility: string, tryAgain: string, noChanges: string) {
    return `<!DOCTYPE html
    PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">

<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!--[if mso]>
    <noscript>
        <xml>
            <o:OfficeDocumentSettings>
                <o:PixelsPerInch>96</o:PixelsPerInch>
            </o:OfficeDocumentSettings>
        </xml>
    </noscript>
    <![endif]-->

</head>

<body style="position: relative; margin: 0;">

    <table role="presentation"
        style="width: 100%; border-spacing: 0; border-collapse: collapse; border: 2px solid #000000; mso-table-lspace: 0; mso-table-rspace: 0; background-color: #000; background-image: url('https://storage.delysium.com/ui/SSO/email_design/bg.png'); background-repeat: repeat; background-size: 9%; margin: 0 auto; vertical-align: top;"
        width="100%" bgcolor="#000" background="url('https://storage.delysium.com/ui/whitepaper/email_imgs/logo.png')"
        valign="top">
        <tbody style="width: 100%;">
            <tr>
                <td align="center"
                    style="padding: 0; vertical-align: top; border: 2px solid #000000; margin: 0 0 25px 0;"
                    valign="top">
                    <p style="margin: 0 0 0 0; width:100%">
                        <img class="border-image" src="https://storage.delysium.com/ui/SSO/email_design/yellow_bg.png"
                            style="border: 0; width: 100%; height: 15px; top: initial; bottom: 0;" height="15">
                    </p>
                    <img style="border: 0; margin: 25.5px 0 0 0; width: 153px; height: 66px;" width="153" height="66"
                        src="https://storage.delysium.com/ui/whitepaper/email_imgs/logo.png" />
                    <p role="heading"
                        style="text-transform: initial; color: #FFFFFF; font-style: normal; line-height: 21px; max-width: 470px; font-family: 'Chakra Petch', sans-serif; font-size: 20px; text-align: center; font-weight: 500; margin: 10px 0 0 0;"
                        class="title">
                        Welcome to Delysium | The world’s First Playable AAA Blockchain Game
                    </p>
                    <p style="text-align: left; max-width: 470px; font-family: 'Chakra Petch', sans-serif; text-transform: capitalize; color: #FFFFFF; font-style: normal; font-weight: 400; font-size: 20px; line-height: 26px; margin: 68.5px 0 29px 0;"
                        class="subtitle">
                        Your ${target} Verification Code
                    </p>


                    <p id="verification-code" class="code" align="center"
                        style="display:inline-block; margin: 20px 0px 0px 0px; text-transform: initial; max-width: 470px; font-family: 'Chakra Petch', sans-serif; color: #FAE232; font-style: normal; font-weight: 300; font-size: 36px; line-height: 47px; text-align: center; letter-spacing: 0.3em;">
                        ${code}</p>

                    <p
                        style="font-family: 'Chakra Petch', sans-serif; text-transform: initial; color: #FFFFFF; font-style: normal; font-weight: 400; font-size: 16px; line-height: 21px; text-align: left; max-width: 470px; padding: 0 8px; margin: 50px 0 0 0;">
                        Hi there,</p>
                    <p
                        style="margin: 20px 0 0 0; font-family: 'Chakra Petch', sans-serif; text-transform: initial; color: #FFFFFF; font-style: normal; font-weight: 400; font-size: 16px; line-height: 21px; text-align: left; max-width: 470px;">
                        ${utility}
                    </p>

                    <p
                        style="margin: 20px 0 0 0; font-family: 'Chakra Petch', sans-serif; text-transform: initial; color: #FFFFFF; font-style: normal; font-weight: 400; font-size: 16px; line-height: 21px; text-align: left; max-width: 470px;">
                        Please use the code soon! Your verification code will expire in '10 minutes'.
                    </p>
                    <p
                        style="margin: 20px 0 0 0; font-family: 'Chakra Petch', sans-serif; text-transform: initial; color: #FFFFFF; font-style: normal; font-weight: 400; font-size: 16px; line-height: 21px; text-align: left; max-width: 470px;">
                        Thank you, <br style="height: 21px; width: 100%; margin: 10px 0;">
                        Delysium Team
                    </p>
                    <p
                        style="margin: 20px 0 0 0; font-family: 'Chakra Petch', sans-serif; text-transform: initial; color: #FFFFFF; font-style: normal; font-weight: 400; font-size: 16px; line-height: 21px; text-align: left; max-width: 470px;">
                        If your code expired. Please ${tryAgain} to get a new code.</p>
                    <p
                        style="margin: 20px 0 0 0; font-family: 'Chakra Petch', sans-serif; text-transform: initial; color: #FFFFFF; font-style: normal; font-weight: 400; font-size: 16px; line-height: 21px; text-align: left; max-width: 470px;">
                        Did not request this code? Then there is no further action you need to take. ${noChanges}
                    </p>
                    <p
                        style="margin: 20px 0 0 0; font-family: 'Chakra Petch', sans-serif; text-transform: initial; color: #FFFFFF; font-style: normal; font-weight: 400; font-size: 16px; line-height: 21px; text-align: left; max-width: 470px;">
                        Having issues with email verification or creating an account? Join our
                        <a class="link" target="_blank" href="https://discord.com/invite/delysium"
                            style="text-decoration: underline; color: #FAE232;">
                            discord
                        </a>
                        and create a ticket.
                    </p>

                    <p style="font-family: 'Chakra Petch', sans-serif; text-transform: initial; color: #FFFFFF; font-style: normal; font-weight: 400; font-size: 16px; line-height: 21px; max-width: 470px; margin: 102.5px 0 24px 0; text-align: center;"
                        align="center">
                        <a class="icon-box" width="25" height="25" href="https://delysium.medium.com/" target="_blank"
                            style="text-decoration: none;">
                            <img alt="medium" src="https://storage.delysium.com/ui/whitepaper/email_imgs/medium.png"
                                style="border: 0; width: 25px; height: 25px; margin: 0 14px;" width="25" height="25">
                        </a>
                        <a class="icon-box" width="25" height="25" href="https://twitter.com/The_Delysium"
                            target="_blank" style="text-decoration: none;">
                            <img alt="twitter" src="https://storage.delysium.com/ui/whitepaper/email_imgs/twitter.png"
                                style="border: 0; width: 25px; height: 25px; margin: 0 14px;" width="25" height="25">
                        </a>
                        <a class="icon-box" width="25" height="25" href="https://discord.com/invite/delysium"
                            target="_blank" style="text-decoration: none;">
                            <img alt="discord" src="https://storage.delysium.com/ui/whitepaper/email_imgs/discord.png"
                                style="border: 0; width: 25px; height: 25px; margin: 0 14px;" width="25" height="25">
                        </a>
                        <a class="icon-box" width="25" height="25" href="https://t.me/TheDelysium" target="_blank"
                            style="text-decoration: none;">
                            <img alt="telegram" src="https://storage.delysium.com/ui/whitepaper/email_imgs/telegram.png"
                                style="border: 0; width: 25px; height: 25px; margin: 0 14px;" width="25" height="25">
                        </a>
                        <a class="icon-box" width="25" height="25"
                            href="https://www.youtube.com/channel/UCalVfmQbvDKVZlz8Cypo9xA/about" target="_blank"
                            style="text-decoration: none;">
                            <img alt="youtube" src="https://storage.delysium.com/ui/whitepaper/email_imgs/youtube.png"
                                style="border: 0; width: 25px; height: 25px; margin: 0 14px;" width="25" height="25">
                        </a>
                    </p>


                    <small class="copyright"
                        style="font-family: 'Chakra Petch', sans-serif; font-style: normal; font-weight: 400; font-size: 12px; line-height: 16px; color: #FFFFFF; opacity: 0.6;">
                        © 2022 Delysium. All rights reserved.
                    </small>
                    <a class="footer-link" href="https://www.delysium.com/account/terms-of-use" target="_blank"
                        style="font-family: 'Chakra Petch', sans-serif; font-style: normal; font-weight: 400; font-size: 12px; line-height: 16px; text-decoration-line: underline; color: #FAE232; opacity: 0.7; margin: 0 5px;">Terms
                        of
                        Use</a>
                    <a class="footer-link" href="https://discord.com/invite/delysium" target="_blank"
                        style="font-family: 'Chakra Petch', sans-serif; font-style: normal; font-weight: 400; font-size: 12px; line-height: 16px; text-decoration-line: underline; color: #FAE232; opacity: 0.7; margin: 0 5px;">Need
                        Help</a>
                    <p style="margin: 10px 0 0 0; width: 100%;">
                        <img class="border-image" src="https://storage.delysium.com/ui/SSO/email_design/yellow_bg.png"
                            style="border: 0; width: 100%; height: 15px; top: initial; bottom: 0;" height="15" />
                    </p>

                </td>
            </tr>
        </tbody>
    </table>

</body>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500&amp;display=swap" rel="stylesheet">

</html>`
}