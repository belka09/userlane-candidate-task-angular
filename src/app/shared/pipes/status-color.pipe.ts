import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusColor',
  standalone: true,
})
export class StatusColorPipe implements PipeTransform {
  transform(status: string): string {
    switch (status.toLowerCase()) {
      case 'active':
        return 'primary';
      case 'suspended':
        return 'disabled';
      case 'inactive':
        return 'warn';
      default:
        return '';
    }
  }
}
