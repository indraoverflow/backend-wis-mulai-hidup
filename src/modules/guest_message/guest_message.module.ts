import {Router} from 'express';
import GuestMessageController from './controller/guest_message.controller';

const router = Router()

// router.get('/create', GuestMessageController.GetAllReceptionMessage)
router.post('/create/:invitation_id', GuestMessageController.createMessageByGuest)
router.get('/get-reception-messages', GuestMessageController.getAllReceptionMessages)

export default (app: Router) => {
    app.use('/messages', router)
}