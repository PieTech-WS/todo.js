import * as fs from 'node:fs';


class Storage{
    data!: string;
    load() {
        fs.readFile('../content.txt','utf-8',
            (err, data) => {
                if (err) {
                    console.log(err);
                } else {
                    return data;
                }
            }
        );
        this.data = JSON.parse(this.data)
    },


}