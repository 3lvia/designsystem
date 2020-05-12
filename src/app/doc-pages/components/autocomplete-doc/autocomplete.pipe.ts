import { Pipe, PipeTransform } from '@angular/core';

@Pipe ({
    name: "AutoCompletePipe"
})
export class AutoCompletePipe implements PipeTransform {

    results = []

    transform(options: String[] , searchQuery: string) {
        if (!searchQuery) {
            return this.results;
        }

        options.forEach(element => {
            if(element.includes(searchQuery)) {
                this.results.push(element);
            }
        });
        return this.results;
    }
}