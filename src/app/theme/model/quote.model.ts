export class QuoteModel {
    _id?: string;
    name: string;
    date: Date = new Date();
    comment?: string;
    cost: Cost[] = [];
    gstCost?: number = 0;
    totalCost?: number;
    outcome: string;
    email: string;
    tender?: string = ``;
    projectStatus: string = 'Incomplete';
    details?: string = `<p>On behalf of All Paint and Coatings (APC) I am pleased to submit the following quotation for your perusal.</p>
    <p>APC is a locally owned and operated Painting and Decorating contractor who has been working in the Building &amp; Construction industry for over 35 years.</p>
    <p>We take pride in our work, as well as the responsibility of protecting your asset from future elements.Below are just some of the reasons why we feel you should choose APC for your upcoming Painting project;</p>`;
    quoteReason?: string = `<h3><span style="text-decoration: underline;"><strong>WHY All Paint &amp; Coatings?</strong></span></h3>
    <ul>
    <li>Uses only premium quality products and materials.</li>
    <li>Warrants our workmanship and coating applications.</li>
    <li>Holds all the necessary licences to carry out all works as specified.</li>
    <li>Clearly specify what work will be carried out. As well as what surface preparation is required to take place and the number of coats of paint that will be applied.</li>
    <li>We are an approved applicator for all major painting manufacturers.</li>
    <li>We are WHS compliant and will ensure that our practices and procedures are specifically designed for your project.</li>
    <li>APC is a locally owned and operated contractor with over 35 years&acirc;&euro;&trade; experience in Painting &amp; Decorating.</li>
    <li>APC will ensure that you receive the best value for your dollar without compromising on quality.</li>
    </ul> <br/><br/><br/>`;
    scopeDetail?: string = `<p><strong><u>SCOPE OF WORK:</u></strong></p>
    <p>Preparation and painting of new internal and external substrates;&nbsp;</p>
    <p>INCLUSIONS:</p>
    <ul>
    <li>Precast walls internal and external Paint only</li>
    <li>Prepare and paint entry pylon walls</li>
    <li>Paint CFC cladding</li>
    <li>Internal Plasterboard walls</li>
    <li>Ceilings</li>
    <li>Prepare and paint plasterboard ceilings</li>
    <li>Doors and frames</li>
    <li>Internal linemarking only&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</li>
    <li>Bollards</li>
    <li>New tenancy works</li>
    </ul>`;
    pricebreakdownHeading: string = 'All works in accordance with Drawings &  Specification supplied';
    pricebreakdownFooter: string = 'Total for supply of material & labour';
    externalSubstrate?: string = `<p><strong><u>PREPARATION OF EXTERNAL SUBSTRATES:</u></strong><br /> All exposed areas will be broomed down to remove excess laitance from the surface. Prior to the application of any coatings, all surfaces will be double checked for any damage. If there is damage the site foreman will be notified.</p>`;
    internalSubstrate: string = `<br/><p><strong><u>PREPARATION OF INTERNAL SUBSTRATES</u>:</strong><br /> All areas to be painted will be sanded and swept down to remove excess Latinate from the surface. Prior to the application of any final coatings, surfaces will be check for damage.
    <br /> If additional pre paint is required, the site foreman will be notified to contact the plasterer. Furthermore once final coats have been completed, the McNab site foreman will be notified to sign these areas off. <br />
    Once the area has been signed off any damage after this period will constitute a variation for rectification. No allowance has been made to rectify poor skirting miters or frame miters due to back workmanship by the builder.</p><br/><br/><br/><br/><br/><br/><br/>`;
}
class Cost {
    heading?: string = "Total for supply of material labour";
    cost: number = 0;
}
