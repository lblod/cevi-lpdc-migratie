import {expect, test} from 'vitest';
import {unescapeHtmlEntities} from "../src/html-utils";
import he from "he";

test("unescaping characters", () => {
    const escapedString = `&lt;p&gt;De aangifte gebeurt door de moeder, de vader/meemoeder of beiden samen. De vader of meemoeder kan het kind enkel aangeven:&lt;/p&gt;&lt;ul&gt;&lt;li&gt;als hij of zij gehuwd is met de moeder&lt;/li&gt;&lt;li&gt;als hij of zij voor de geboorte &lt;a href="https://www.vlaanderen.be/een-kind-erkennen" data-content-type="Product" data-identifier="a1f94940-ff18-4ab6-b325-eb7505ed2f02" data-language="nl" data-is-private="false"&gt;het kind erkend&lt;/a&gt; heeft. Als de vader of meemoeder het kind nog niet heeft erkend, dan kan dit nog in het gemeentehuis tijdens de aangifte. In dat geval moeten de moeder en de vader of meemoeder samen aanwezig zijn.&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;Na de dag van de bevalling hebt u &lt;strong&gt;15 kalenderdagen om de geboorte aan te geven&lt;/strong&gt;. Als de vijftiende dag na de bevalling een zaterdag, zondag of wettelijke feestdag is dan hebt u nog tijd tot de eerstvolgende werkdag.&lt;/p&gt;&lt;p&gt;U geeft uw kind aan bij de &lt;strong&gt;burgerlijke stand&lt;/strong&gt; van de gemeente waar het kind geboren is:&lt;/p&gt;&lt;ul&gt;&lt;li&gt;ter plaatse aan het loket&lt;/li&gt;&lt;li&gt;online (indien beschikbaar) via Mijn Burgerprofiel of via de website van de gemeente waar het kind geboren is.&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;In sommige gemeenten is het ook mogelijk om de geboorteaangifte van uw kind in de kraamkliniek zelf te doen.&lt;/p&gt;&lt;p&gt;Bij de aangifte ontvangt u een aantal &lt;strong&gt;geboortebewijzen&lt;/strong&gt;. Verlies deze documenten niet, want u kunt hiermee:&lt;/p&gt;&lt;ul&gt;&lt;li&gt;het &lt;span&gt;Groeipakket&lt;/span&gt; aanvragen&lt;/li&gt;&lt;li&gt;uw kind als persoon ten laste laten inschrijven bij uw ziekenfonds.&lt;/li&gt;&lt;/ul&gt;&lt;p&gt;Ook bij een &lt;a href="https://www.vlaanderen.be/overlijdensaangifte-van-een-doodgeboren-kind" data-content-type="Product" data-identifier="7a1ece74-4f89-4e0e-abc2-d7bec11eea12" data-language="nl" data-is-private="false"&gt;doodgeboren kind&lt;/a&gt; geldt aangifteplicht vanaf een zwangerschapsduur van 180 dagen.&lt;/p&gt;`;
    const actual = unescapeHtmlEntities(escapedString);
    expect(actual).toEqual("<p>De aangifte gebeurt door de moeder, de vader/meemoeder of beiden samen. De vader of meemoeder kan het kind enkel aangeven:</p><ul><li>als hij of zij gehuwd is met de moeder</li><li>als hij of zij voor de geboorte <a href=\"https://www.vlaanderen.be/een-kind-erkennen\" data-content-type=\"Product\" data-identifier=\"a1f94940-ff18-4ab6-b325-eb7505ed2f02\" data-language=\"nl\" data-is-private=\"false\">het kind erkend</a> heeft. Als de vader of meemoeder het kind nog niet heeft erkend, dan kan dit nog in het gemeentehuis tijdens de aangifte. In dat geval moeten de moeder en de vader of meemoeder samen aanwezig zijn.</li></ul><p>Na de dag van de bevalling hebt u <strong>15 kalenderdagen om de geboorte aan te geven</strong>. Als de vijftiende dag na de bevalling een zaterdag, zondag of wettelijke feestdag is dan hebt u nog tijd tot de eerstvolgende werkdag.</p><p>U geeft uw kind aan bij de <strong>burgerlijke stand</strong> van de gemeente waar het kind geboren is:</p><ul><li>ter plaatse aan het loket</li><li>online (indien beschikbaar) via Mijn Burgerprofiel of via de website van de gemeente waar het kind geboren is.</li></ul><p>In sommige gemeenten is het ook mogelijk om de geboorteaangifte van uw kind in de kraamkliniek zelf te doen.</p><p>Bij de aangifte ontvangt u een aantal <strong>geboortebewijzen</strong>. Verlies deze documenten niet, want u kunt hiermee:</p><ul><li>het <span>Groeipakket</span> aanvragen</li><li>uw kind als persoon ten laste laten inschrijven bij uw ziekenfonds.</li></ul><p>Ook bij een <a href=\"https://www.vlaanderen.be/overlijdensaangifte-van-een-doodgeboren-kind\" data-content-type=\"Product\" data-identifier=\"7a1ece74-4f89-4e0e-abc2-d7bec11eea12\" data-language=\"nl\" data-is-private=\"false\">doodgeboren kind</a> geldt aangifteplicht vanaf een zwangerschapsduur van 180 dagen.</p>");
})

test("unescaping already cleaned characters", () => {
    const escapedString = `<p>Hello</p>`;
    const actual = unescapeHtmlEntities(escapedString);
    expect(actual).toEqual("<p>Hello</p>");
});

test("decode with he", () => {
    const escapedString = `<p>Hello</p>`;
    const actual = he.decode(escapedString);
    expect(actual).toEqual("<p>Hello</p>");
});

test("decode with he", () => {
    const escapedString = `&lt;p&gt;De aangifte gebeurt door de moeder, de vader/meemoeder of beiden samen. De vader of meemoeder kan het kind enkel aangeven:&lt;/p&gt;`;
    const actual = he.decode(escapedString);
    expect(actual).toEqual("<p>De aangifte gebeurt door de moeder, de vader/meemoeder of beiden samen. De vader of meemoeder kan het kind enkel aangeven:</p>");
})