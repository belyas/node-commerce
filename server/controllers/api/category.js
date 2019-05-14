import CategoryModel from '../../models/category';

export default class Category {
    static async all (req, res) {
        try {
            const categories = await CategoryModel.find({}).sort([['createdAt', -1]]);

            res.status(200).json({ 'data': categories });
        } catch (err) {
            return res.status(500).json({ 'error': err });
        }
    }
}
