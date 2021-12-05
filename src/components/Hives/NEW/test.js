const object = {
    name:'woiesoi',
    surname:'lroo',
    plec:'chodok',
    showText() {}
}


for(const key in object) {
    if (object.hasOwnProperty(key))
    console.log('klucz: '+ key+' wartość: ' + object[key])
}
for (const key of Object.keys(object)) {
    console.log(key); 
}
for (const value of Object.values(object)) {
    console.log(value); 
}
for (const [key, val] of Object.entries(object)) {
    console.log(key, val); 
}