export function welcomeMessage(code: number) {
    return formatHTMLMessage(
        code,
        "Register",
        "You can verify your email address by using the following code to complete the account setup.",
        "<a class=\"link\" href=\"https://www.dlab.ovh/auth/register\" style=\"text-decoration: underline; color: #FAE232;\">sign up</a> again",
        "No account will be created.")
}

export function resetPasswordMessage(code: number) {
    return formatHTMLMessage(code,
        "Reset Password",
        "You can verify your email address to reset your password by using the following code to complete the account update.",
        "try again",
        "No changes will be applied to your account.")
}

export function updateEmailMessage(code: number) {
    return formatHTMLMessage(code,
        "Update Email",
        "You can verify your email address to update your account's email by using the following code to complete the account update.",
        "try again",
        "No changes will be applied to your account.")
}

export function updatePasswordMessage(code: number) {
    return formatHTMLMessage(code,
        "Update Password",
        "You can verify your email address to update your account's password by using the following code to complete the account update.",
        "try again",
        "No changes will be applied to your account.")
}

export function bindWalletMessage(code: number) {
    return formatHTMLMessage(code,
        "Bind Wallet",
        "You can verify your email address to bind your wallet by using the following code to complete the account update.",
        "try again",
        "No changes will be applied to your account.")
}

export function bindDiscordMessage(code: number) {
    return formatHTMLMessage(code,
        "Bind Discord",
        "You can verify your email address to bind your Discord by using the following code to complete the account update.",
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
        style="width: 100%; border-spacing: 0; border-collapse: collapse; border: 2px solid #000000; mso-table-lspace: 0; mso-table-rspace: 0; background-size: 9%; margin: 0 auto; vertical-align: top;"
        width="100%"
        valign="top">
        <tbody style="width: 100%;">
            <tr>
                <td align="center"
                    style="padding: 0; vertical-align: top; border: 2px solid #000000; margin: 0 0 25px 0;"
                    valign="top">
                    <p style="margin: 0 0 0 0; width:100%">
                    </p>
                    <p role="heading"
                        style="text-transform: initial; font-style: normal; line-height: 21px; max-width: 470px; font-family: 'Chakra Petch', sans-serif; font-size: 20px; text-align: center; font-weight: 500; margin: 10px 0 0 0;"
                        class="title">
                        Welcome to DLab
                    </p>
                    <p style="text-align: left; max-width: 470px; font-family: 'Chakra Petch', sans-serif; text-transform: capitalize; font-style: normal; font-weight: 400; font-size: 20px; line-height: 26px; margin: 68.5px 0 29px 0;"
                        class="subtitle">
                        Your ${target} Verification Code
                    </p>


                    <p id="verification-code" class="code" align="center"
                        style="display:inline-block; margin: 20px 0px 0px 0px; text-transform: initial; max-width: 470px; font-family: 'Chakra Petch', sans-serif; color: #FAE232; font-style: normal; font-weight: 300; font-size: 36px; line-height: 47px; text-align: center; letter-spacing: 0.3em;">
                        ${code}</p>

                    <p
                        style="font-family: 'Chakra Petch', sans-serif; text-transform: initial; font-style: normal; font-weight: 400; font-size: 16px; line-height: 21px; text-align: left; max-width: 470px; padding: 0 8px; margin: 50px 0 0 0;">
                        Hi there,</p>
                    <p
                        style="margin: 20px 0 0 0; font-family: 'Chakra Petch', sans-serif; text-transform: initial; font-style: normal; font-weight: 400; font-size: 16px; line-height: 21px; text-align: left; max-width: 470px;">
                        ${utility}
                    </p>

                    <p
                        style="margin: 20px 0 0 0; font-family: 'Chakra Petch', sans-serif; text-transform: initial; font-style: normal; font-weight: 400; font-size: 16px; line-height: 21px; text-align: left; max-width: 470px;">
                        Please use the code soon! Your verification code will expire in '10 minutes'.
                    </p>
                    <p
                        style="margin: 20px 0 0 0; font-family: 'Chakra Petch', sans-serif; text-transform: initial; font-style: normal; font-weight: 400; font-size: 16px; line-height: 21px; text-align: left; max-width: 470px;">
                        Thank you, <br style="height: 21px; width: 100%; margin: 10px 0;">
                    </p>
                    <p
                        style="margin: 20px 0 0 0; font-family: 'Chakra Petch', sans-serif; text-transform: initial; font-style: normal; font-weight: 400; font-size: 16px; line-height: 21px; text-align: left; max-width: 470px;">
                        If your code expired. Please ${tryAgain} to get a new code.</p>
                    <p
                        style="margin: 20px 0 0 0; font-family: 'Chakra Petch', sans-serif; text-transform: initial; font-style: normal; font-weight: 400; font-size: 16px; line-height: 21px; text-align: left; max-width: 470px;">
                        Did not request this code? Then there is no further action you need to take. ${noChanges}
                    </p>

                    <small class="copyright"
                        style="font-family: 'Chakra Petch', sans-serif; font-style: normal; font-weight: 400; font-size: 12px; line-height: 16px; opacity: 0.6;">
                        © 2022 DLab. All rights reserved.
                    </small>
                </td>
            </tr>
        </tbody>
    </table>

</body>
<link href="https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500&amp;display=swap" rel="stylesheet">

</html>`
}