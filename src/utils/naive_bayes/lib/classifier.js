const fs = require('fs');

module.exports = class Classifier {

    constructor(extractFeatures) {
        this.featureCounts = {}; // ex {'job': {'good': 8, 'bad': 2}}
        this.categoryCounts = {}; // ex {'spam': 2, 'ham': 6}
        this.extractFeatures = extractFeatures;
    }

    increaseFeatureCounts(feature, category) {
        if (! this.featureCounts[feature]) this.featureCounts[feature] = {};
        if (! this.featureCounts[feature][category]) this.featureCounts[feature][category] = 0;
        this.featureCounts[feature][category] += 1;
    }

    increaseCategoryCounts(category) {
        if (! this.categoryCounts[category]) this.categoryCounts[category] = 0;
        this.categoryCounts[category] += 1;
    }

    getFeatureCount(feature, category) {
        if (this.featureCounts[feature] && this.featureCounts[feature][category]) {
            return parseFloat(this.featureCounts[feature][category]).toFixed(2);
        }
        return parseFloat('0').toFixed(2);
    }

    getCategoryCount(category) {
        if (this.categoryCounts[category]) {
            return parseFloat(this.categoryCounts[category]).toFixed(2);
        }
        return parseFloat('0').toFixed(2);
    }

    getTotalCategoryCount() {
        let values = Object.values(this.categoryCounts);
        let total = 0;
        values.forEach((v) => total += v);
        return total;
    }

    getCategories() {
        return Object.keys(this.categoryCounts);
    }

    calcFeatureProb(feature, category) {
        let categoryCount = this.getCategoryCount(category);
        if (categoryCount == 0.00) return 0;
        return this.getFeatureCount(feature, category) / categoryCount;
    }

    calcWeightedProb(feature, category, weight = 1.0, ap = 0.5) {
        let probabilty = this.calcFeatureProb(feature, category);
        let categories = this.getCategories();
        let total = 0;
        categories.forEach((cat) => total += Number(this.getFeatureCount(feature, cat)));
        return ((weight * ap) + (total * probabilty)) / (weight + total);
    }

    trainInline(text, category, save = false, file = './data.txt') {
        const features = this.extractFeatures(text);
        features.forEach((f) => this.increaseFeatureCounts(f, category));
        this.increaseCategoryCounts(category);
        if (save) {
            const line = `${fs.existsSync(file) ? '\n' : ''}${text}:::${category}`;
            fs.appendFile(file, line, (err) => {
                if (err) throw new Error('Error adding text to training data');
                console.log(`"${line}" added to training data file`);
            });
        }
    }

    trainFromFile(path) {
        try {
            let data = fs.readFileSync(path);
            data = data.toString();
            let lines = data.split('\n');
            lines.forEach((line) => {
                line = line.split(':::');
                if (line.length < 2) throw new Error('Invalid data format. Format is "training text:::category"');
                this.trainInline(line[0], line[1]);
            });
        } catch(e) {
            console.log(e);
        }
    }

    trainMultiple(texts, category, save = false, file = './data.txt') {
        if (Array.isArray(texts)) {
            texts.forEach(text => this.trainInline(text, category, save, file));
        } else {
            this.trainMultiple([texts], category, save, file);
        }
    }
};