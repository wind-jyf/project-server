const Classifier = require('./classifier');
const {extractFeatures} = require('./utils');

module.exports = class NaiveBayes extends Classifier {

    constructor(ef = extractFeatures) {
        super(ef);
        this.thresholds = {}; 
    }

    setThreshold(category, threshold) {
        this.thresholds[category] = threshold;
    }

    getThreshold(category) {
        return this.thresholds[category] ? this.thresholds[category] : 1.0;
    }

    calcDocumentProb(doc, category) {
        let features = this.extractFeatures(doc);
        let product = 1;
        features.forEach((feature) => product *= this.calcWeightedProb(feature, category));
        return product;
    }

    calcCategoryProb(doc, category) {
        let categoryProb = this.getCategoryCount(category) / this.getTotalCategoryCount();
        let documentProb = this.calcDocumentProb(doc, category);
        return categoryProb * documentProb;
    }

    classify(doc, def = null) {
        let probabilities = {};
        let max = 0;
        let best;
        let categories = this.getCategories();
        categories.forEach((category) => {
            probabilities[category] = this.calcCategoryProb(doc, category);
            if (probabilities[category] > max) {
                max = probabilities[category];
                best = category;
            }
        });
        for (let category in probabilities) {
            if (category === best) continue;
            let prob = probabilities[category] * this.getThreshold(best);
            if (prob > probabilities[best]) return def;
        }
        return best;
    }
};