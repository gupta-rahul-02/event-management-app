function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }


export const otpGenerator = async(req,res) =>{
    const {email} = req.body;
    const otp = Math.floor(getRandomArbitrary(1000,9999));
    console.log(email,otp);
    res.send('success')
}