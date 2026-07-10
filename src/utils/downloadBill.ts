import { toPng } from 'html-to-image';
import type { Bill } from '../types';

export const downloadBillAsJPG = async (billElement: HTMLElement, bill: Bill): Promise<void> => {
  try {
    const dataUrl = await toPng(billElement, {
      cacheBust: true,
      pixelRatio: 2,
      backgroundColor: '#ffffff',
    });

    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `bill-${bill.id}-${new Date().toISOString().split('T')[0]}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to download bill:', error);
    throw new Error('Failed to download bill as image');
  }
};

export const printBill = (billElement: HTMLElement): void => {
  const printWindow = window.open('', '', 'height=600,width=800');
  if (printWindow) {
    const clonedElement = billElement.cloneNode(true) as HTMLElement;
    printWindow.document.body.appendChild(clonedElement);
    printWindow.document.close();
    printWindow.print();
  }
};
