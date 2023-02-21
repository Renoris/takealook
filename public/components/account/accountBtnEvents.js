/**
 *
 * @param e : Event
 * @param email : string
 * @param nickName : string
 * @param firstName : string
 * @param lastName : string
 * @param gender : string
 * @returns {Promise<void>}
 */

export async function signUpBtnEventListener(e, email, nickName, firstName, lastName, gender) {
    try {
        const response = await fetch('/api/signup', {method : 'POST', headers : {
                'Content-Type' : 'application/json',
            }, body : JSON.stringify( {
                email,
                firstName,
                nickName,
                lastName,
                gender
            })});

        const result = await response.json();
    }catch (error) {
        console.log(error);
    }
}
