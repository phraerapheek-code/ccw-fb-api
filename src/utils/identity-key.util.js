export default function(identity) {
 const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
 const mobileRegex = /^[0-9]{10,15}$/
  let identityKey = ''
 if (emailRegex.test(identity)) {
   identityKey = 'email'
 }
 if (mobileRegex.test(identity)) {
   identityKey = 'mobile'
 }
 return identityKey
}
